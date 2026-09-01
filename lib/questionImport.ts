import * as XLSX from 'xlsx';

export type ImportedQuestion = {
  prompt: string;
  options: string[];
  answer: string;
  marks: number;
};

export type ImportValidationError = {
  row: number;
  message: string;
};

export type ImportQuestionsResult = {
  questions: ImportedQuestion[];
  errors: ImportValidationError[];
  importedCount: number;
};

const normalizeKey = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');

const normalizeCell = (value: unknown) => {
  if (value === null || value === undefined) return '';
  return String(value).trim();
};

const buildRowMap = (row: Record<string, unknown>) => {
  const mapped: Record<string, string> = {};
  Object.entries(row).forEach(([key, value]) => {
    const normalized = normalizeKey(key);
    mapped[normalized] = normalizeCell(value);
  });
  return mapped;
};

const resolveValue = (row: Record<string, string>, candidates: string[]) => {
  for (const candidate of candidates) {
    const value = row[candidate];
    if (value !== undefined && value !== '') return value;
  }
  return '';
};

export async function importQuestionsFromFile(file: File): Promise<ImportQuestionsResult> {
  const fileName = file.name.toLowerCase();
  const isCsv = fileName.endsWith('.csv');
  const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');

  if (!isCsv && !isExcel) {
    return {
      questions: [],
      errors: [{ row: 0, message: 'Unsupported file type. Please upload a .csv, .xls, or .xlsx file.' }],
      importedCount: 0,
    };
  }

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, {
    defval: '',
    raw: false,
  });

  if (!rows.length) {
    return {
      questions: [],
      errors: [{ row: 0, message: 'The uploaded file does not contain any rows to import.' }],
      importedCount: 0,
    };
  }

  const firstRow = buildRowMap(rows[0] as Record<string, unknown>);
  const questionKeyCandidates = ['question', 'questiontext', 'prompt'];
  const optionKeys = ['option1', 'optionone', 'answer1', 'option 1'];
  const option2Keys = ['option2', 'optiontwo', 'answer2', 'option 2'];
  const option3Keys = ['option3', 'optionthree', 'answer3', 'option 3'];
  const option4Keys = ['option4', 'optionfour', 'answer4', 'option 4'];
  const correctAnswerKeys = ['correctanswer', 'answer', 'correct'];
  const marksKeys = ['marks', 'score', 'points'];

  const questions: ImportedQuestion[] = [];
  const errors: ImportValidationError[] = [];

  rows.forEach((row, index) => {
    if (index === 0) return;

    const normalizedRow = buildRowMap(row as Record<string, unknown>);
    const question = resolveValue(normalizedRow, questionKeyCandidates);
    const option1 = resolveValue(normalizedRow, optionKeys);
    const option2 = resolveValue(normalizedRow, option2Keys);
    const option3 = resolveValue(normalizedRow, option3Keys);
    const option4 = resolveValue(normalizedRow, option4Keys);
    const correctAnswer = resolveValue(normalizedRow, correctAnswerKeys);
    const rawMarks = resolveValue(normalizedRow, marksKeys);

    const trimmedQuestion = question.trim();
    const options = [option1, option2, option3, option4].map((option) => option.trim()).filter(Boolean);
    const marks = Number(rawMarks);

    if (!trimmedQuestion) {
      errors.push({ row: index + 1, message: 'Missing question text.' });
      return;
    }

    if (options.length < 2) {
      errors.push({ row: index + 1, message: 'At least two answer options are required.' });
      return;
    }

    if (!correctAnswer.trim()) {
      errors.push({ row: index + 1, message: 'Correct answer is missing.' });
      return;
    }

    if (!options.includes(correctAnswer.trim())) {
      errors.push({ row: index + 1, message: `Correct answer "${correctAnswer}" does not match the provided options.` });
      return;
    }

    if (!Number.isFinite(marks) || marks <= 0) {
      errors.push({ row: index + 1, message: 'Marks must be a positive number.' });
      return;
    }

    questions.push({
      prompt: trimmedQuestion,
      options: options.slice(0, 4).concat(['', '', '', '']).slice(0, 4),
      answer: correctAnswer.trim(),
      marks,
    });
  });

  return {
    questions,
    errors,
    importedCount: questions.length,
  };
}
