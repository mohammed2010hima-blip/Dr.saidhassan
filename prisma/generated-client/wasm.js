
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  passwordHash: 'passwordHash',
  role: 'role',
  geminiApiKey: 'geminiApiKey',
  geminiModel: 'geminiModel',
  platformName: 'platformName',
  teacherTitle: 'teacherTitle',
  teacherBio: 'teacherBio',
  teacherExperience: 'teacherExperience',
  teacherStudentsCount: 'teacherStudentsCount',
  teacherCoursesCount: 'teacherCoursesCount',
  heroBadge: 'heroBadge',
  heroTitle: 'heroTitle',
  heroSubtitle: 'heroSubtitle',
  teacherImageUrl: 'teacherImageUrl',
  brandTheme: 'brandTheme',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AcademicStageScalarFieldEnum = {
  id: 'id',
  teacherId: 'teacherId',
  name: 'name',
  orderIndex: 'orderIndex',
  createdAt: 'createdAt'
};

exports.Prisma.StudentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  username: 'username',
  email: 'email',
  passwordHash: 'passwordHash',
  phone: 'phone',
  parentPhone: 'parentPhone',
  stage: 'stage',
  groupName: 'groupName',
  semester: 'semester',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  title: 'title',
  message: 'message',
  type: 'type',
  link: 'link',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  teacherId: 'teacherId',
  title: 'title',
  stage: 'stage',
  description: 'description',
  badge: 'badge',
  lessonsCount: 'lessonsCount',
  duration: 'duration',
  price: 'price',
  themeColor: 'themeColor',
  isPublished: 'isPublished',
  orderIndex: 'orderIndex',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GroupScalarFieldEnum = {
  id: 'id',
  teacherId: 'teacherId',
  name: 'name',
  stage: 'stage',
  createdAt: 'createdAt'
};

exports.Prisma.ExamScalarFieldEnum = {
  id: 'id',
  teacherId: 'teacherId',
  code: 'code',
  title: 'title',
  description: 'description',
  durationMinutes: 'durationMinutes',
  status: 'status',
  allowMultipleAttempts: 'allowMultipleAttempts',
  maxAttempts: 'maxAttempts',
  targetStage: 'targetStage',
  targetGroup: 'targetGroup',
  targetSemester: 'targetSemester',
  startsAt: 'startsAt',
  endsAt: 'endsAt',
  examType: 'examType',
  showResultsDirectly: 'showResultsDirectly',
  requirePhone: 'requirePhone',
  requireGroup: 'requireGroup',
  groupsList: 'groupsList',
  totalPoints: 'totalPoints',
  passingPercentage: 'passingPercentage',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuestionScalarFieldEnum = {
  id: 'id',
  examId: 'examId',
  questionNumber: 'questionNumber',
  type: 'type',
  questionText: 'questionText',
  points: 'points',
  correctOptionId: 'correctOptionId',
  needsReview: 'needsReview',
  orderIndex: 'orderIndex'
};

exports.Prisma.QuestionOptionScalarFieldEnum = {
  id: 'id',
  questionId: 'questionId',
  optionKey: 'optionKey',
  text: 'text'
};

exports.Prisma.ExamAttemptScalarFieldEnum = {
  id: 'id',
  examId: 'examId',
  studentId: 'studentId',
  studentName: 'studentName',
  studentPhone: 'studentPhone',
  studentGroup: 'studentGroup',
  extraData: 'extraData',
  startedAt: 'startedAt',
  submittedAt: 'submittedAt',
  timeSpentSeconds: 'timeSpentSeconds',
  status: 'status',
  isApproved: 'isApproved',
  approvedAt: 'approvedAt',
  approvedBy: 'approvedBy',
  teacherNotes: 'teacherNotes',
  mcqScore: 'mcqScore',
  essayScore: 'essayScore',
  totalScore: 'totalScore',
  maxScore: 'maxScore',
  percentage: 'percentage',
  isPassed: 'isPassed',
  createdAt: 'createdAt'
};

exports.Prisma.StudentAnswerScalarFieldEnum = {
  id: 'id',
  attemptId: 'attemptId',
  questionId: 'questionId',
  selectedOption: 'selectedOption',
  essayAnswer: 'essayAnswer',
  isCorrect: 'isCorrect',
  pointsAwarded: 'pointsAwarded',
  teacherFeedback: 'teacherFeedback',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  AcademicStage: 'AcademicStage',
  Student: 'Student',
  Notification: 'Notification',
  Course: 'Course',
  Group: 'Group',
  Exam: 'Exam',
  Question: 'Question',
  QuestionOption: 'QuestionOption',
  ExamAttempt: 'ExamAttempt',
  StudentAnswer: 'StudentAnswer'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
