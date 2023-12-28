// import { appSchema, tableSchema } from '@nozbe/watermelondb'

// export const mySchema = appSchema({
//   version: 1,
//   tables: [
//     tableSchema({
//       name: 'quiz_overviews',
//       columns: [
//         { name: 'id', type: 'string', isIndexed: true },
//         { name: 'name', type: 'string' },
//         { name: 'description', type: 'string' },
//         { name: 'level', type: 'string' },
//         { name: 'number_of_tasks', type: 'number' },
//       ],
//     }),
//     tableSchema({
//       name: 'quiz_details',
//       columns: [
//         { name: 'id', type: 'string', isIndexed: true },
//         { name: 'name', type: 'string' },
//         { name: 'description', type: 'string' },
//         { name: 'level', type: 'string' },
//       ],
//     }),
//     tableSchema({
//       name: 'tasks',
//       columns: [
//         { name: 'id', type: 'string', isIndexed: true },
//         { name: 'quizOverviewId', type: 'string', isIndexed: true },
//         { name: 'question', type: 'string' },
//         { name: 'duration', type: 'number' },
//       ],
//     }),
//     tableSchema({
//       name: 'answers',
//       columns: [
//         { name: 'id', type: 'string', isIndexed: true },
//         { name: 'taskId', type: 'string', isIndexed: true },
//         { name: 'content', type: 'string' },
//         { name: 'isCorrect', type: 'boolean' },
//       ],
//     }),
//   ],
// });