
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model AcademicStage
 * 
 */
export type AcademicStage = $Result.DefaultSelection<Prisma.$AcademicStagePayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model Exam
 * 
 */
export type Exam = $Result.DefaultSelection<Prisma.$ExamPayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model QuestionOption
 * 
 */
export type QuestionOption = $Result.DefaultSelection<Prisma.$QuestionOptionPayload>
/**
 * Model ExamAttempt
 * 
 */
export type ExamAttempt = $Result.DefaultSelection<Prisma.$ExamAttemptPayload>
/**
 * Model StudentAnswer
 * 
 */
export type StudentAnswer = $Result.DefaultSelection<Prisma.$StudentAnswerPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.academicStage`: Exposes CRUD operations for the **AcademicStage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicStages
    * const academicStages = await prisma.academicStage.findMany()
    * ```
    */
  get academicStage(): Prisma.AcademicStageDelegate<ExtArgs>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs>;

  /**
   * `prisma.exam`: Exposes CRUD operations for the **Exam** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exams
    * const exams = await prisma.exam.findMany()
    * ```
    */
  get exam(): Prisma.ExamDelegate<ExtArgs>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs>;

  /**
   * `prisma.questionOption`: Exposes CRUD operations for the **QuestionOption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestionOptions
    * const questionOptions = await prisma.questionOption.findMany()
    * ```
    */
  get questionOption(): Prisma.QuestionOptionDelegate<ExtArgs>;

  /**
   * `prisma.examAttempt`: Exposes CRUD operations for the **ExamAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExamAttempts
    * const examAttempts = await prisma.examAttempt.findMany()
    * ```
    */
  get examAttempt(): Prisma.ExamAttemptDelegate<ExtArgs>;

  /**
   * `prisma.studentAnswer`: Exposes CRUD operations for the **StudentAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentAnswers
    * const studentAnswers = await prisma.studentAnswer.findMany()
    * ```
    */
  get studentAnswer(): Prisma.StudentAnswerDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "academicStage" | "student" | "notification" | "course" | "group" | "exam" | "question" | "questionOption" | "examAttempt" | "studentAnswer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      AcademicStage: {
        payload: Prisma.$AcademicStagePayload<ExtArgs>
        fields: Prisma.AcademicStageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicStageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicStagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicStageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicStagePayload>
          }
          findFirst: {
            args: Prisma.AcademicStageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicStagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicStageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicStagePayload>
          }
          findMany: {
            args: Prisma.AcademicStageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicStagePayload>[]
          }
          create: {
            args: Prisma.AcademicStageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicStagePayload>
          }
          createMany: {
            args: Prisma.AcademicStageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcademicStageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicStagePayload>[]
          }
          delete: {
            args: Prisma.AcademicStageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicStagePayload>
          }
          update: {
            args: Prisma.AcademicStageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicStagePayload>
          }
          deleteMany: {
            args: Prisma.AcademicStageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicStageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcademicStageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicStagePayload>
          }
          aggregate: {
            args: Prisma.AcademicStageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicStage>
          }
          groupBy: {
            args: Prisma.AcademicStageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicStageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicStageCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicStageCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      Exam: {
        payload: Prisma.$ExamPayload<ExtArgs>
        fields: Prisma.ExamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          findFirst: {
            args: Prisma.ExamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          findMany: {
            args: Prisma.ExamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>[]
          }
          create: {
            args: Prisma.ExamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          createMany: {
            args: Prisma.ExamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>[]
          }
          delete: {
            args: Prisma.ExamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          update: {
            args: Prisma.ExamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          deleteMany: {
            args: Prisma.ExamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          aggregate: {
            args: Prisma.ExamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExam>
          }
          groupBy: {
            args: Prisma.ExamGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExamGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExamCountArgs<ExtArgs>
            result: $Utils.Optional<ExamCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      QuestionOption: {
        payload: Prisma.$QuestionOptionPayload<ExtArgs>
        fields: Prisma.QuestionOptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionOptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionOptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          findFirst: {
            args: Prisma.QuestionOptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionOptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          findMany: {
            args: Prisma.QuestionOptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[]
          }
          create: {
            args: Prisma.QuestionOptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          createMany: {
            args: Prisma.QuestionOptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionOptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[]
          }
          delete: {
            args: Prisma.QuestionOptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          update: {
            args: Prisma.QuestionOptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionOptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionOptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestionOptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          aggregate: {
            args: Prisma.QuestionOptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestionOption>
          }
          groupBy: {
            args: Prisma.QuestionOptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionOptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionOptionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionOptionCountAggregateOutputType> | number
          }
        }
      }
      ExamAttempt: {
        payload: Prisma.$ExamAttemptPayload<ExtArgs>
        fields: Prisma.ExamAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExamAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExamAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          findFirst: {
            args: Prisma.ExamAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExamAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          findMany: {
            args: Prisma.ExamAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>[]
          }
          create: {
            args: Prisma.ExamAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          createMany: {
            args: Prisma.ExamAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExamAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>[]
          }
          delete: {
            args: Prisma.ExamAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          update: {
            args: Prisma.ExamAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          deleteMany: {
            args: Prisma.ExamAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExamAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExamAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamAttemptPayload>
          }
          aggregate: {
            args: Prisma.ExamAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExamAttempt>
          }
          groupBy: {
            args: Prisma.ExamAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExamAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExamAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<ExamAttemptCountAggregateOutputType> | number
          }
        }
      }
      StudentAnswer: {
        payload: Prisma.$StudentAnswerPayload<ExtArgs>
        fields: Prisma.StudentAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          findFirst: {
            args: Prisma.StudentAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          findMany: {
            args: Prisma.StudentAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>[]
          }
          create: {
            args: Prisma.StudentAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          createMany: {
            args: Prisma.StudentAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentAnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>[]
          }
          delete: {
            args: Prisma.StudentAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          update: {
            args: Prisma.StudentAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          deleteMany: {
            args: Prisma.StudentAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAnswerPayload>
          }
          aggregate: {
            args: Prisma.StudentAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentAnswer>
          }
          groupBy: {
            args: Prisma.StudentAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<StudentAnswerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    exams: number
    groups: number
    courses: number
    stages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exams?: boolean | UserCountOutputTypeCountExamsArgs
    groups?: boolean | UserCountOutputTypeCountGroupsArgs
    courses?: boolean | UserCountOutputTypeCountCoursesArgs
    stages?: boolean | UserCountOutputTypeCountStagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicStageWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    attempts: number
    notifications: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | StudentCountOutputTypeCountAttemptsArgs
    notifications?: boolean | StudentCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamAttemptWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type ExamCountOutputType
   */

  export type ExamCountOutputType = {
    questions: number
    attempts: number
  }

  export type ExamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | ExamCountOutputTypeCountQuestionsArgs
    attempts?: boolean | ExamCountOutputTypeCountAttemptsArgs
  }

  // Custom InputTypes
  /**
   * ExamCountOutputType without action
   */
  export type ExamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamCountOutputType
     */
    select?: ExamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExamCountOutputType without action
   */
  export type ExamCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * ExamCountOutputType without action
   */
  export type ExamCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamAttemptWhereInput
  }


  /**
   * Count Type QuestionCountOutputType
   */

  export type QuestionCountOutputType = {
    options: number
    answers: number
  }

  export type QuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | QuestionCountOutputTypeCountOptionsArgs
    answers?: boolean | QuestionCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionCountOutputType
     */
    select?: QuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionOptionWhereInput
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentAnswerWhereInput
  }


  /**
   * Count Type ExamAttemptCountOutputType
   */

  export type ExamAttemptCountOutputType = {
    answers: number
  }

  export type ExamAttemptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | ExamAttemptCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * ExamAttemptCountOutputType without action
   */
  export type ExamAttemptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttemptCountOutputType
     */
    select?: ExamAttemptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExamAttemptCountOutputType without action
   */
  export type ExamAttemptCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentAnswerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    geminiApiKey: string | null
    geminiModel: string | null
    platformName: string | null
    teacherTitle: string | null
    teacherBio: string | null
    teacherExperience: string | null
    teacherStudentsCount: string | null
    teacherCoursesCount: string | null
    heroBadge: string | null
    heroTitle: string | null
    heroSubtitle: string | null
    teacherImageUrl: string | null
    brandTheme: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    geminiApiKey: string | null
    geminiModel: string | null
    platformName: string | null
    teacherTitle: string | null
    teacherBio: string | null
    teacherExperience: string | null
    teacherStudentsCount: string | null
    teacherCoursesCount: string | null
    heroBadge: string | null
    heroTitle: string | null
    heroSubtitle: string | null
    teacherImageUrl: string | null
    brandTheme: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    role: number
    geminiApiKey: number
    geminiModel: number
    platformName: number
    teacherTitle: number
    teacherBio: number
    teacherExperience: number
    teacherStudentsCount: number
    teacherCoursesCount: number
    heroBadge: number
    heroTitle: number
    heroSubtitle: number
    teacherImageUrl: number
    brandTheme: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    geminiApiKey?: true
    geminiModel?: true
    platformName?: true
    teacherTitle?: true
    teacherBio?: true
    teacherExperience?: true
    teacherStudentsCount?: true
    teacherCoursesCount?: true
    heroBadge?: true
    heroTitle?: true
    heroSubtitle?: true
    teacherImageUrl?: true
    brandTheme?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    geminiApiKey?: true
    geminiModel?: true
    platformName?: true
    teacherTitle?: true
    teacherBio?: true
    teacherExperience?: true
    teacherStudentsCount?: true
    teacherCoursesCount?: true
    heroBadge?: true
    heroTitle?: true
    heroSubtitle?: true
    teacherImageUrl?: true
    brandTheme?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    geminiApiKey?: true
    geminiModel?: true
    platformName?: true
    teacherTitle?: true
    teacherBio?: true
    teacherExperience?: true
    teacherStudentsCount?: true
    teacherCoursesCount?: true
    heroBadge?: true
    heroTitle?: true
    heroSubtitle?: true
    teacherImageUrl?: true
    brandTheme?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    role: string
    geminiApiKey: string | null
    geminiModel: string
    platformName: string
    teacherTitle: string
    teacherBio: string
    teacherExperience: string
    teacherStudentsCount: string
    teacherCoursesCount: string
    heroBadge: string
    heroTitle: string
    heroSubtitle: string
    teacherImageUrl: string
    brandTheme: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    geminiApiKey?: boolean
    geminiModel?: boolean
    platformName?: boolean
    teacherTitle?: boolean
    teacherBio?: boolean
    teacherExperience?: boolean
    teacherStudentsCount?: boolean
    teacherCoursesCount?: boolean
    heroBadge?: boolean
    heroTitle?: boolean
    heroSubtitle?: boolean
    teacherImageUrl?: boolean
    brandTheme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    exams?: boolean | User$examsArgs<ExtArgs>
    groups?: boolean | User$groupsArgs<ExtArgs>
    courses?: boolean | User$coursesArgs<ExtArgs>
    stages?: boolean | User$stagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    geminiApiKey?: boolean
    geminiModel?: boolean
    platformName?: boolean
    teacherTitle?: boolean
    teacherBio?: boolean
    teacherExperience?: boolean
    teacherStudentsCount?: boolean
    teacherCoursesCount?: boolean
    heroBadge?: boolean
    heroTitle?: boolean
    heroSubtitle?: boolean
    teacherImageUrl?: boolean
    brandTheme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    geminiApiKey?: boolean
    geminiModel?: boolean
    platformName?: boolean
    teacherTitle?: boolean
    teacherBio?: boolean
    teacherExperience?: boolean
    teacherStudentsCount?: boolean
    teacherCoursesCount?: boolean
    heroBadge?: boolean
    heroTitle?: boolean
    heroSubtitle?: boolean
    teacherImageUrl?: boolean
    brandTheme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exams?: boolean | User$examsArgs<ExtArgs>
    groups?: boolean | User$groupsArgs<ExtArgs>
    courses?: boolean | User$coursesArgs<ExtArgs>
    stages?: boolean | User$stagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      exams: Prisma.$ExamPayload<ExtArgs>[]
      groups: Prisma.$GroupPayload<ExtArgs>[]
      courses: Prisma.$CoursePayload<ExtArgs>[]
      stages: Prisma.$AcademicStagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      role: string
      geminiApiKey: string | null
      geminiModel: string
      platformName: string
      teacherTitle: string
      teacherBio: string
      teacherExperience: string
      teacherStudentsCount: string
      teacherCoursesCount: string
      heroBadge: string
      heroTitle: string
      heroSubtitle: string
      teacherImageUrl: string
      brandTheme: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exams<T extends User$examsArgs<ExtArgs> = {}>(args?: Subset<T, User$examsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findMany"> | Null>
    groups<T extends User$groupsArgs<ExtArgs> = {}>(args?: Subset<T, User$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany"> | Null>
    courses<T extends User$coursesArgs<ExtArgs> = {}>(args?: Subset<T, User$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany"> | Null>
    stages<T extends User$stagesArgs<ExtArgs> = {}>(args?: Subset<T, User$stagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly geminiApiKey: FieldRef<"User", 'String'>
    readonly geminiModel: FieldRef<"User", 'String'>
    readonly platformName: FieldRef<"User", 'String'>
    readonly teacherTitle: FieldRef<"User", 'String'>
    readonly teacherBio: FieldRef<"User", 'String'>
    readonly teacherExperience: FieldRef<"User", 'String'>
    readonly teacherStudentsCount: FieldRef<"User", 'String'>
    readonly teacherCoursesCount: FieldRef<"User", 'String'>
    readonly heroBadge: FieldRef<"User", 'String'>
    readonly heroTitle: FieldRef<"User", 'String'>
    readonly heroSubtitle: FieldRef<"User", 'String'>
    readonly teacherImageUrl: FieldRef<"User", 'String'>
    readonly brandTheme: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.exams
   */
  export type User$examsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    where?: ExamWhereInput
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    cursor?: ExamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamScalarFieldEnum | ExamScalarFieldEnum[]
  }

  /**
   * User.groups
   */
  export type User$groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    cursor?: GroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * User.courses
   */
  export type User$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * User.stages
   */
  export type User$stagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
    where?: AcademicStageWhereInput
    orderBy?: AcademicStageOrderByWithRelationInput | AcademicStageOrderByWithRelationInput[]
    cursor?: AcademicStageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcademicStageScalarFieldEnum | AcademicStageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model AcademicStage
   */

  export type AggregateAcademicStage = {
    _count: AcademicStageCountAggregateOutputType | null
    _avg: AcademicStageAvgAggregateOutputType | null
    _sum: AcademicStageSumAggregateOutputType | null
    _min: AcademicStageMinAggregateOutputType | null
    _max: AcademicStageMaxAggregateOutputType | null
  }

  export type AcademicStageAvgAggregateOutputType = {
    orderIndex: number | null
  }

  export type AcademicStageSumAggregateOutputType = {
    orderIndex: number | null
  }

  export type AcademicStageMinAggregateOutputType = {
    id: string | null
    teacherId: string | null
    name: string | null
    orderIndex: number | null
    createdAt: Date | null
  }

  export type AcademicStageMaxAggregateOutputType = {
    id: string | null
    teacherId: string | null
    name: string | null
    orderIndex: number | null
    createdAt: Date | null
  }

  export type AcademicStageCountAggregateOutputType = {
    id: number
    teacherId: number
    name: number
    orderIndex: number
    createdAt: number
    _all: number
  }


  export type AcademicStageAvgAggregateInputType = {
    orderIndex?: true
  }

  export type AcademicStageSumAggregateInputType = {
    orderIndex?: true
  }

  export type AcademicStageMinAggregateInputType = {
    id?: true
    teacherId?: true
    name?: true
    orderIndex?: true
    createdAt?: true
  }

  export type AcademicStageMaxAggregateInputType = {
    id?: true
    teacherId?: true
    name?: true
    orderIndex?: true
    createdAt?: true
  }

  export type AcademicStageCountAggregateInputType = {
    id?: true
    teacherId?: true
    name?: true
    orderIndex?: true
    createdAt?: true
    _all?: true
  }

  export type AcademicStageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicStage to aggregate.
     */
    where?: AcademicStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicStages to fetch.
     */
    orderBy?: AcademicStageOrderByWithRelationInput | AcademicStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicStages
    **/
    _count?: true | AcademicStageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcademicStageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcademicStageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicStageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicStageMaxAggregateInputType
  }

  export type GetAcademicStageAggregateType<T extends AcademicStageAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicStage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicStage[P]>
      : GetScalarType<T[P], AggregateAcademicStage[P]>
  }




  export type AcademicStageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicStageWhereInput
    orderBy?: AcademicStageOrderByWithAggregationInput | AcademicStageOrderByWithAggregationInput[]
    by: AcademicStageScalarFieldEnum[] | AcademicStageScalarFieldEnum
    having?: AcademicStageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicStageCountAggregateInputType | true
    _avg?: AcademicStageAvgAggregateInputType
    _sum?: AcademicStageSumAggregateInputType
    _min?: AcademicStageMinAggregateInputType
    _max?: AcademicStageMaxAggregateInputType
  }

  export type AcademicStageGroupByOutputType = {
    id: string
    teacherId: string | null
    name: string
    orderIndex: number
    createdAt: Date
    _count: AcademicStageCountAggregateOutputType | null
    _avg: AcademicStageAvgAggregateOutputType | null
    _sum: AcademicStageSumAggregateOutputType | null
    _min: AcademicStageMinAggregateOutputType | null
    _max: AcademicStageMaxAggregateOutputType | null
  }

  type GetAcademicStageGroupByPayload<T extends AcademicStageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicStageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicStageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicStageGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicStageGroupByOutputType[P]>
        }
      >
    >


  export type AcademicStageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    name?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    teacher?: boolean | AcademicStage$teacherArgs<ExtArgs>
  }, ExtArgs["result"]["academicStage"]>

  export type AcademicStageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    name?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    teacher?: boolean | AcademicStage$teacherArgs<ExtArgs>
  }, ExtArgs["result"]["academicStage"]>

  export type AcademicStageSelectScalar = {
    id?: boolean
    teacherId?: boolean
    name?: boolean
    orderIndex?: boolean
    createdAt?: boolean
  }

  export type AcademicStageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | AcademicStage$teacherArgs<ExtArgs>
  }
  export type AcademicStageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | AcademicStage$teacherArgs<ExtArgs>
  }

  export type $AcademicStagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicStage"
    objects: {
      teacher: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teacherId: string | null
      name: string
      orderIndex: number
      createdAt: Date
    }, ExtArgs["result"]["academicStage"]>
    composites: {}
  }

  type AcademicStageGetPayload<S extends boolean | null | undefined | AcademicStageDefaultArgs> = $Result.GetResult<Prisma.$AcademicStagePayload, S>

  type AcademicStageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AcademicStageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AcademicStageCountAggregateInputType | true
    }

  export interface AcademicStageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicStage'], meta: { name: 'AcademicStage' } }
    /**
     * Find zero or one AcademicStage that matches the filter.
     * @param {AcademicStageFindUniqueArgs} args - Arguments to find a AcademicStage
     * @example
     * // Get one AcademicStage
     * const academicStage = await prisma.academicStage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicStageFindUniqueArgs>(args: SelectSubset<T, AcademicStageFindUniqueArgs<ExtArgs>>): Prisma__AcademicStageClient<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AcademicStage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AcademicStageFindUniqueOrThrowArgs} args - Arguments to find a AcademicStage
     * @example
     * // Get one AcademicStage
     * const academicStage = await prisma.academicStage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicStageFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicStageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicStageClient<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AcademicStage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicStageFindFirstArgs} args - Arguments to find a AcademicStage
     * @example
     * // Get one AcademicStage
     * const academicStage = await prisma.academicStage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicStageFindFirstArgs>(args?: SelectSubset<T, AcademicStageFindFirstArgs<ExtArgs>>): Prisma__AcademicStageClient<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AcademicStage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicStageFindFirstOrThrowArgs} args - Arguments to find a AcademicStage
     * @example
     * // Get one AcademicStage
     * const academicStage = await prisma.academicStage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicStageFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicStageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicStageClient<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AcademicStages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicStageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicStages
     * const academicStages = await prisma.academicStage.findMany()
     * 
     * // Get first 10 AcademicStages
     * const academicStages = await prisma.academicStage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academicStageWithIdOnly = await prisma.academicStage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcademicStageFindManyArgs>(args?: SelectSubset<T, AcademicStageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AcademicStage.
     * @param {AcademicStageCreateArgs} args - Arguments to create a AcademicStage.
     * @example
     * // Create one AcademicStage
     * const AcademicStage = await prisma.academicStage.create({
     *   data: {
     *     // ... data to create a AcademicStage
     *   }
     * })
     * 
     */
    create<T extends AcademicStageCreateArgs>(args: SelectSubset<T, AcademicStageCreateArgs<ExtArgs>>): Prisma__AcademicStageClient<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AcademicStages.
     * @param {AcademicStageCreateManyArgs} args - Arguments to create many AcademicStages.
     * @example
     * // Create many AcademicStages
     * const academicStage = await prisma.academicStage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicStageCreateManyArgs>(args?: SelectSubset<T, AcademicStageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcademicStages and returns the data saved in the database.
     * @param {AcademicStageCreateManyAndReturnArgs} args - Arguments to create many AcademicStages.
     * @example
     * // Create many AcademicStages
     * const academicStage = await prisma.academicStage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcademicStages and only return the `id`
     * const academicStageWithIdOnly = await prisma.academicStage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcademicStageCreateManyAndReturnArgs>(args?: SelectSubset<T, AcademicStageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AcademicStage.
     * @param {AcademicStageDeleteArgs} args - Arguments to delete one AcademicStage.
     * @example
     * // Delete one AcademicStage
     * const AcademicStage = await prisma.academicStage.delete({
     *   where: {
     *     // ... filter to delete one AcademicStage
     *   }
     * })
     * 
     */
    delete<T extends AcademicStageDeleteArgs>(args: SelectSubset<T, AcademicStageDeleteArgs<ExtArgs>>): Prisma__AcademicStageClient<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AcademicStage.
     * @param {AcademicStageUpdateArgs} args - Arguments to update one AcademicStage.
     * @example
     * // Update one AcademicStage
     * const academicStage = await prisma.academicStage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicStageUpdateArgs>(args: SelectSubset<T, AcademicStageUpdateArgs<ExtArgs>>): Prisma__AcademicStageClient<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AcademicStages.
     * @param {AcademicStageDeleteManyArgs} args - Arguments to filter AcademicStages to delete.
     * @example
     * // Delete a few AcademicStages
     * const { count } = await prisma.academicStage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicStageDeleteManyArgs>(args?: SelectSubset<T, AcademicStageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicStages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicStageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicStages
     * const academicStage = await prisma.academicStage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicStageUpdateManyArgs>(args: SelectSubset<T, AcademicStageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcademicStage.
     * @param {AcademicStageUpsertArgs} args - Arguments to update or create a AcademicStage.
     * @example
     * // Update or create a AcademicStage
     * const academicStage = await prisma.academicStage.upsert({
     *   create: {
     *     // ... data to create a AcademicStage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicStage we want to update
     *   }
     * })
     */
    upsert<T extends AcademicStageUpsertArgs>(args: SelectSubset<T, AcademicStageUpsertArgs<ExtArgs>>): Prisma__AcademicStageClient<$Result.GetResult<Prisma.$AcademicStagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AcademicStages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicStageCountArgs} args - Arguments to filter AcademicStages to count.
     * @example
     * // Count the number of AcademicStages
     * const count = await prisma.academicStage.count({
     *   where: {
     *     // ... the filter for the AcademicStages we want to count
     *   }
     * })
    **/
    count<T extends AcademicStageCountArgs>(
      args?: Subset<T, AcademicStageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicStageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicStage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicStageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcademicStageAggregateArgs>(args: Subset<T, AcademicStageAggregateArgs>): Prisma.PrismaPromise<GetAcademicStageAggregateType<T>>

    /**
     * Group by AcademicStage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicStageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcademicStageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicStageGroupByArgs['orderBy'] }
        : { orderBy?: AcademicStageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcademicStageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicStageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicStage model
   */
  readonly fields: AcademicStageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicStage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicStageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends AcademicStage$teacherArgs<ExtArgs> = {}>(args?: Subset<T, AcademicStage$teacherArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcademicStage model
   */ 
  interface AcademicStageFieldRefs {
    readonly id: FieldRef<"AcademicStage", 'String'>
    readonly teacherId: FieldRef<"AcademicStage", 'String'>
    readonly name: FieldRef<"AcademicStage", 'String'>
    readonly orderIndex: FieldRef<"AcademicStage", 'Int'>
    readonly createdAt: FieldRef<"AcademicStage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcademicStage findUnique
   */
  export type AcademicStageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
    /**
     * Filter, which AcademicStage to fetch.
     */
    where: AcademicStageWhereUniqueInput
  }

  /**
   * AcademicStage findUniqueOrThrow
   */
  export type AcademicStageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
    /**
     * Filter, which AcademicStage to fetch.
     */
    where: AcademicStageWhereUniqueInput
  }

  /**
   * AcademicStage findFirst
   */
  export type AcademicStageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
    /**
     * Filter, which AcademicStage to fetch.
     */
    where?: AcademicStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicStages to fetch.
     */
    orderBy?: AcademicStageOrderByWithRelationInput | AcademicStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicStages.
     */
    cursor?: AcademicStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicStages.
     */
    distinct?: AcademicStageScalarFieldEnum | AcademicStageScalarFieldEnum[]
  }

  /**
   * AcademicStage findFirstOrThrow
   */
  export type AcademicStageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
    /**
     * Filter, which AcademicStage to fetch.
     */
    where?: AcademicStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicStages to fetch.
     */
    orderBy?: AcademicStageOrderByWithRelationInput | AcademicStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicStages.
     */
    cursor?: AcademicStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicStages.
     */
    distinct?: AcademicStageScalarFieldEnum | AcademicStageScalarFieldEnum[]
  }

  /**
   * AcademicStage findMany
   */
  export type AcademicStageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
    /**
     * Filter, which AcademicStages to fetch.
     */
    where?: AcademicStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicStages to fetch.
     */
    orderBy?: AcademicStageOrderByWithRelationInput | AcademicStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicStages.
     */
    cursor?: AcademicStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicStages.
     */
    skip?: number
    distinct?: AcademicStageScalarFieldEnum | AcademicStageScalarFieldEnum[]
  }

  /**
   * AcademicStage create
   */
  export type AcademicStageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademicStage.
     */
    data: XOR<AcademicStageCreateInput, AcademicStageUncheckedCreateInput>
  }

  /**
   * AcademicStage createMany
   */
  export type AcademicStageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicStages.
     */
    data: AcademicStageCreateManyInput | AcademicStageCreateManyInput[]
  }

  /**
   * AcademicStage createManyAndReturn
   */
  export type AcademicStageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AcademicStages.
     */
    data: AcademicStageCreateManyInput | AcademicStageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicStage update
   */
  export type AcademicStageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademicStage.
     */
    data: XOR<AcademicStageUpdateInput, AcademicStageUncheckedUpdateInput>
    /**
     * Choose, which AcademicStage to update.
     */
    where: AcademicStageWhereUniqueInput
  }

  /**
   * AcademicStage updateMany
   */
  export type AcademicStageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicStages.
     */
    data: XOR<AcademicStageUpdateManyMutationInput, AcademicStageUncheckedUpdateManyInput>
    /**
     * Filter which AcademicStages to update
     */
    where?: AcademicStageWhereInput
  }

  /**
   * AcademicStage upsert
   */
  export type AcademicStageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademicStage to update in case it exists.
     */
    where: AcademicStageWhereUniqueInput
    /**
     * In case the AcademicStage found by the `where` argument doesn't exist, create a new AcademicStage with this data.
     */
    create: XOR<AcademicStageCreateInput, AcademicStageUncheckedCreateInput>
    /**
     * In case the AcademicStage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicStageUpdateInput, AcademicStageUncheckedUpdateInput>
  }

  /**
   * AcademicStage delete
   */
  export type AcademicStageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
    /**
     * Filter which AcademicStage to delete.
     */
    where: AcademicStageWhereUniqueInput
  }

  /**
   * AcademicStage deleteMany
   */
  export type AcademicStageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicStages to delete
     */
    where?: AcademicStageWhereInput
  }

  /**
   * AcademicStage.teacher
   */
  export type AcademicStage$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AcademicStage without action
   */
  export type AcademicStageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicStage
     */
    select?: AcademicStageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicStageInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentMinAggregateOutputType = {
    id: string | null
    name: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    phone: string | null
    parentPhone: string | null
    stage: string | null
    groupName: string | null
    semester: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    phone: string | null
    parentPhone: string | null
    stage: string | null
    groupName: string | null
    semester: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    name: number
    username: number
    email: number
    passwordHash: number
    phone: number
    parentPhone: number
    stage: number
    groupName: number
    semester: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentMinAggregateInputType = {
    id?: true
    name?: true
    username?: true
    email?: true
    passwordHash?: true
    phone?: true
    parentPhone?: true
    stage?: true
    groupName?: true
    semester?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    name?: true
    username?: true
    email?: true
    passwordHash?: true
    phone?: true
    parentPhone?: true
    stage?: true
    groupName?: true
    semester?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    name?: true
    username?: true
    email?: true
    passwordHash?: true
    phone?: true
    parentPhone?: true
    stage?: true
    groupName?: true
    semester?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: string
    name: string
    username: string
    email: string | null
    passwordHash: string
    phone: string
    parentPhone: string
    stage: string
    groupName: string
    semester: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    phone?: boolean
    parentPhone?: boolean
    stage?: boolean
    groupName?: boolean
    semester?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attempts?: boolean | Student$attemptsArgs<ExtArgs>
    notifications?: boolean | Student$notificationsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    phone?: boolean
    parentPhone?: boolean
    stage?: boolean
    groupName?: boolean
    semester?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    phone?: boolean
    parentPhone?: boolean
    stage?: boolean
    groupName?: boolean
    semester?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | Student$attemptsArgs<ExtArgs>
    notifications?: boolean | Student$notificationsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      attempts: Prisma.$ExamAttemptPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      username: string
      email: string | null
      passwordHash: string
      phone: string
      parentPhone: string
      stage: string
      groupName: string
      semester: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attempts<T extends Student$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, Student$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends Student$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Student$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'String'>
    readonly name: FieldRef<"Student", 'String'>
    readonly username: FieldRef<"Student", 'String'>
    readonly email: FieldRef<"Student", 'String'>
    readonly passwordHash: FieldRef<"Student", 'String'>
    readonly phone: FieldRef<"Student", 'String'>
    readonly parentPhone: FieldRef<"Student", 'String'>
    readonly stage: FieldRef<"Student", 'String'>
    readonly groupName: FieldRef<"Student", 'String'>
    readonly semester: FieldRef<"Student", 'String'>
    readonly isActive: FieldRef<"Student", 'Boolean'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }

  /**
   * Student.attempts
   */
  export type Student$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    where?: ExamAttemptWhereInput
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    cursor?: ExamAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamAttemptScalarFieldEnum | ExamAttemptScalarFieldEnum[]
  }

  /**
   * Student.notifications
   */
  export type Student$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    title: string | null
    message: string | null
    type: string | null
    link: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    title: string | null
    message: string | null
    type: string | null
    link: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    studentId: number
    title: number
    message: number
    type: number
    link: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    studentId?: true
    title?: true
    message?: true
    type?: true
    link?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    studentId?: true
    title?: true
    message?: true
    type?: true
    link?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    studentId?: true
    title?: true
    message?: true
    type?: true
    link?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    studentId: string
    title: string
    message: string
    type: string
    link: string | null
    isRead: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    link?: boolean
    isRead?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    link?: boolean
    isRead?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    studentId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    link?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      title: string
      message: string
      type: string
      link: string | null
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly studentId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly link: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    lessonsCount: number | null
    orderIndex: number | null
  }

  export type CourseSumAggregateOutputType = {
    lessonsCount: number | null
    orderIndex: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    teacherId: string | null
    title: string | null
    stage: string | null
    description: string | null
    badge: string | null
    lessonsCount: number | null
    duration: string | null
    price: string | null
    themeColor: string | null
    isPublished: boolean | null
    orderIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    teacherId: string | null
    title: string | null
    stage: string | null
    description: string | null
    badge: string | null
    lessonsCount: number | null
    duration: string | null
    price: string | null
    themeColor: string | null
    isPublished: boolean | null
    orderIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    teacherId: number
    title: number
    stage: number
    description: number
    badge: number
    lessonsCount: number
    duration: number
    price: number
    themeColor: number
    isPublished: number
    orderIndex: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    lessonsCount?: true
    orderIndex?: true
  }

  export type CourseSumAggregateInputType = {
    lessonsCount?: true
    orderIndex?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    teacherId?: true
    title?: true
    stage?: true
    description?: true
    badge?: true
    lessonsCount?: true
    duration?: true
    price?: true
    themeColor?: true
    isPublished?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    teacherId?: true
    title?: true
    stage?: true
    description?: true
    badge?: true
    lessonsCount?: true
    duration?: true
    price?: true
    themeColor?: true
    isPublished?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    teacherId?: true
    title?: true
    stage?: true
    description?: true
    badge?: true
    lessonsCount?: true
    duration?: true
    price?: true
    themeColor?: true
    isPublished?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    teacherId: string
    title: string
    stage: string
    description: string
    badge: string
    lessonsCount: number
    duration: string
    price: string | null
    themeColor: string
    isPublished: boolean
    orderIndex: number
    createdAt: Date
    updatedAt: Date
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    title?: boolean
    stage?: boolean
    description?: boolean
    badge?: boolean
    lessonsCount?: boolean
    duration?: boolean
    price?: boolean
    themeColor?: boolean
    isPublished?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    title?: boolean
    stage?: boolean
    description?: boolean
    badge?: boolean
    lessonsCount?: boolean
    duration?: boolean
    price?: boolean
    themeColor?: boolean
    isPublished?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    teacherId?: boolean
    title?: boolean
    stage?: boolean
    description?: boolean
    badge?: boolean
    lessonsCount?: boolean
    duration?: boolean
    price?: boolean
    themeColor?: boolean
    isPublished?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      teacher: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teacherId: string
      title: string
      stage: string
      description: string
      badge: string
      lessonsCount: number
      duration: string
      price: string | null
      themeColor: string
      isPublished: boolean
      orderIndex: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */ 
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly teacherId: FieldRef<"Course", 'String'>
    readonly title: FieldRef<"Course", 'String'>
    readonly stage: FieldRef<"Course", 'String'>
    readonly description: FieldRef<"Course", 'String'>
    readonly badge: FieldRef<"Course", 'String'>
    readonly lessonsCount: FieldRef<"Course", 'Int'>
    readonly duration: FieldRef<"Course", 'String'>
    readonly price: FieldRef<"Course", 'String'>
    readonly themeColor: FieldRef<"Course", 'String'>
    readonly isPublished: FieldRef<"Course", 'Boolean'>
    readonly orderIndex: FieldRef<"Course", 'Int'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly updatedAt: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    teacherId: string | null
    name: string | null
    stage: string | null
    createdAt: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    teacherId: string | null
    name: string | null
    stage: string | null
    createdAt: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    teacherId: number
    name: number
    stage: number
    createdAt: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    teacherId?: true
    name?: true
    stage?: true
    createdAt?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    teacherId?: true
    name?: true
    stage?: true
    createdAt?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    teacherId?: true
    name?: true
    stage?: true
    createdAt?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: string
    teacherId: string
    name: string
    stage: string | null
    createdAt: Date
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    name?: boolean
    stage?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    name?: boolean
    stage?: boolean
    createdAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectScalar = {
    id?: boolean
    teacherId?: boolean
    name?: boolean
    stage?: boolean
    createdAt?: boolean
  }

  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      teacher: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teacherId: string
      name: string
      stage: string | null
      createdAt: Date
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {GroupCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Group model
   */ 
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'String'>
    readonly teacherId: FieldRef<"Group", 'String'>
    readonly name: FieldRef<"Group", 'String'>
    readonly stage: FieldRef<"Group", 'String'>
    readonly createdAt: FieldRef<"Group", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
  }

  /**
   * Group createManyAndReturn
   */
  export type GroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model Exam
   */

  export type AggregateExam = {
    _count: ExamCountAggregateOutputType | null
    _avg: ExamAvgAggregateOutputType | null
    _sum: ExamSumAggregateOutputType | null
    _min: ExamMinAggregateOutputType | null
    _max: ExamMaxAggregateOutputType | null
  }

  export type ExamAvgAggregateOutputType = {
    durationMinutes: number | null
    maxAttempts: number | null
    totalPoints: number | null
    passingPercentage: number | null
  }

  export type ExamSumAggregateOutputType = {
    durationMinutes: number | null
    maxAttempts: number | null
    totalPoints: number | null
    passingPercentage: number | null
  }

  export type ExamMinAggregateOutputType = {
    id: string | null
    teacherId: string | null
    code: string | null
    title: string | null
    description: string | null
    durationMinutes: number | null
    status: string | null
    allowMultipleAttempts: boolean | null
    maxAttempts: number | null
    targetStage: string | null
    targetGroup: string | null
    targetSemester: string | null
    startsAt: Date | null
    endsAt: Date | null
    examType: string | null
    showResultsDirectly: boolean | null
    requirePhone: boolean | null
    requireGroup: boolean | null
    groupsList: string | null
    totalPoints: number | null
    passingPercentage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExamMaxAggregateOutputType = {
    id: string | null
    teacherId: string | null
    code: string | null
    title: string | null
    description: string | null
    durationMinutes: number | null
    status: string | null
    allowMultipleAttempts: boolean | null
    maxAttempts: number | null
    targetStage: string | null
    targetGroup: string | null
    targetSemester: string | null
    startsAt: Date | null
    endsAt: Date | null
    examType: string | null
    showResultsDirectly: boolean | null
    requirePhone: boolean | null
    requireGroup: boolean | null
    groupsList: string | null
    totalPoints: number | null
    passingPercentage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExamCountAggregateOutputType = {
    id: number
    teacherId: number
    code: number
    title: number
    description: number
    durationMinutes: number
    status: number
    allowMultipleAttempts: number
    maxAttempts: number
    targetStage: number
    targetGroup: number
    targetSemester: number
    startsAt: number
    endsAt: number
    examType: number
    showResultsDirectly: number
    requirePhone: number
    requireGroup: number
    groupsList: number
    totalPoints: number
    passingPercentage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExamAvgAggregateInputType = {
    durationMinutes?: true
    maxAttempts?: true
    totalPoints?: true
    passingPercentage?: true
  }

  export type ExamSumAggregateInputType = {
    durationMinutes?: true
    maxAttempts?: true
    totalPoints?: true
    passingPercentage?: true
  }

  export type ExamMinAggregateInputType = {
    id?: true
    teacherId?: true
    code?: true
    title?: true
    description?: true
    durationMinutes?: true
    status?: true
    allowMultipleAttempts?: true
    maxAttempts?: true
    targetStage?: true
    targetGroup?: true
    targetSemester?: true
    startsAt?: true
    endsAt?: true
    examType?: true
    showResultsDirectly?: true
    requirePhone?: true
    requireGroup?: true
    groupsList?: true
    totalPoints?: true
    passingPercentage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExamMaxAggregateInputType = {
    id?: true
    teacherId?: true
    code?: true
    title?: true
    description?: true
    durationMinutes?: true
    status?: true
    allowMultipleAttempts?: true
    maxAttempts?: true
    targetStage?: true
    targetGroup?: true
    targetSemester?: true
    startsAt?: true
    endsAt?: true
    examType?: true
    showResultsDirectly?: true
    requirePhone?: true
    requireGroup?: true
    groupsList?: true
    totalPoints?: true
    passingPercentage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExamCountAggregateInputType = {
    id?: true
    teacherId?: true
    code?: true
    title?: true
    description?: true
    durationMinutes?: true
    status?: true
    allowMultipleAttempts?: true
    maxAttempts?: true
    targetStage?: true
    targetGroup?: true
    targetSemester?: true
    startsAt?: true
    endsAt?: true
    examType?: true
    showResultsDirectly?: true
    requirePhone?: true
    requireGroup?: true
    groupsList?: true
    totalPoints?: true
    passingPercentage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exam to aggregate.
     */
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     */
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exams
    **/
    _count?: true | ExamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamMaxAggregateInputType
  }

  export type GetExamAggregateType<T extends ExamAggregateArgs> = {
        [P in keyof T & keyof AggregateExam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExam[P]>
      : GetScalarType<T[P], AggregateExam[P]>
  }




  export type ExamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamWhereInput
    orderBy?: ExamOrderByWithAggregationInput | ExamOrderByWithAggregationInput[]
    by: ExamScalarFieldEnum[] | ExamScalarFieldEnum
    having?: ExamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamCountAggregateInputType | true
    _avg?: ExamAvgAggregateInputType
    _sum?: ExamSumAggregateInputType
    _min?: ExamMinAggregateInputType
    _max?: ExamMaxAggregateInputType
  }

  export type ExamGroupByOutputType = {
    id: string
    teacherId: string
    code: string
    title: string
    description: string | null
    durationMinutes: number | null
    status: string
    allowMultipleAttempts: boolean
    maxAttempts: number
    targetStage: string | null
    targetGroup: string | null
    targetSemester: string | null
    startsAt: Date | null
    endsAt: Date | null
    examType: string
    showResultsDirectly: boolean
    requirePhone: boolean
    requireGroup: boolean
    groupsList: string
    totalPoints: number
    passingPercentage: number
    createdAt: Date
    updatedAt: Date
    _count: ExamCountAggregateOutputType | null
    _avg: ExamAvgAggregateOutputType | null
    _sum: ExamSumAggregateOutputType | null
    _min: ExamMinAggregateOutputType | null
    _max: ExamMaxAggregateOutputType | null
  }

  type GetExamGroupByPayload<T extends ExamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamGroupByOutputType[P]>
            : GetScalarType<T[P], ExamGroupByOutputType[P]>
        }
      >
    >


  export type ExamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    durationMinutes?: boolean
    status?: boolean
    allowMultipleAttempts?: boolean
    maxAttempts?: boolean
    targetStage?: boolean
    targetGroup?: boolean
    targetSemester?: boolean
    startsAt?: boolean
    endsAt?: boolean
    examType?: boolean
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: boolean
    totalPoints?: boolean
    passingPercentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | Exam$questionsArgs<ExtArgs>
    attempts?: boolean | Exam$attemptsArgs<ExtArgs>
    _count?: boolean | ExamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exam"]>

  export type ExamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    durationMinutes?: boolean
    status?: boolean
    allowMultipleAttempts?: boolean
    maxAttempts?: boolean
    targetStage?: boolean
    targetGroup?: boolean
    targetSemester?: boolean
    startsAt?: boolean
    endsAt?: boolean
    examType?: boolean
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: boolean
    totalPoints?: boolean
    passingPercentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exam"]>

  export type ExamSelectScalar = {
    id?: boolean
    teacherId?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    durationMinutes?: boolean
    status?: boolean
    allowMultipleAttempts?: boolean
    maxAttempts?: boolean
    targetStage?: boolean
    targetGroup?: boolean
    targetSemester?: boolean
    startsAt?: boolean
    endsAt?: boolean
    examType?: boolean
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: boolean
    totalPoints?: boolean
    passingPercentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | Exam$questionsArgs<ExtArgs>
    attempts?: boolean | Exam$attemptsArgs<ExtArgs>
    _count?: boolean | ExamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ExamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exam"
    objects: {
      teacher: Prisma.$UserPayload<ExtArgs>
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      attempts: Prisma.$ExamAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teacherId: string
      code: string
      title: string
      description: string | null
      durationMinutes: number | null
      status: string
      allowMultipleAttempts: boolean
      maxAttempts: number
      targetStage: string | null
      targetGroup: string | null
      targetSemester: string | null
      startsAt: Date | null
      endsAt: Date | null
      examType: string
      showResultsDirectly: boolean
      requirePhone: boolean
      requireGroup: boolean
      groupsList: string
      totalPoints: number
      passingPercentage: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["exam"]>
    composites: {}
  }

  type ExamGetPayload<S extends boolean | null | undefined | ExamDefaultArgs> = $Result.GetResult<Prisma.$ExamPayload, S>

  type ExamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExamFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExamCountAggregateInputType | true
    }

  export interface ExamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exam'], meta: { name: 'Exam' } }
    /**
     * Find zero or one Exam that matches the filter.
     * @param {ExamFindUniqueArgs} args - Arguments to find a Exam
     * @example
     * // Get one Exam
     * const exam = await prisma.exam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExamFindUniqueArgs>(args: SelectSubset<T, ExamFindUniqueArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Exam that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExamFindUniqueOrThrowArgs} args - Arguments to find a Exam
     * @example
     * // Get one Exam
     * const exam = await prisma.exam.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExamFindUniqueOrThrowArgs>(args: SelectSubset<T, ExamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Exam that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamFindFirstArgs} args - Arguments to find a Exam
     * @example
     * // Get one Exam
     * const exam = await prisma.exam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExamFindFirstArgs>(args?: SelectSubset<T, ExamFindFirstArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Exam that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamFindFirstOrThrowArgs} args - Arguments to find a Exam
     * @example
     * // Get one Exam
     * const exam = await prisma.exam.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExamFindFirstOrThrowArgs>(args?: SelectSubset<T, ExamFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Exams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exams
     * const exams = await prisma.exam.findMany()
     * 
     * // Get first 10 Exams
     * const exams = await prisma.exam.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const examWithIdOnly = await prisma.exam.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExamFindManyArgs>(args?: SelectSubset<T, ExamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Exam.
     * @param {ExamCreateArgs} args - Arguments to create a Exam.
     * @example
     * // Create one Exam
     * const Exam = await prisma.exam.create({
     *   data: {
     *     // ... data to create a Exam
     *   }
     * })
     * 
     */
    create<T extends ExamCreateArgs>(args: SelectSubset<T, ExamCreateArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Exams.
     * @param {ExamCreateManyArgs} args - Arguments to create many Exams.
     * @example
     * // Create many Exams
     * const exam = await prisma.exam.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExamCreateManyArgs>(args?: SelectSubset<T, ExamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exams and returns the data saved in the database.
     * @param {ExamCreateManyAndReturnArgs} args - Arguments to create many Exams.
     * @example
     * // Create many Exams
     * const exam = await prisma.exam.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exams and only return the `id`
     * const examWithIdOnly = await prisma.exam.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExamCreateManyAndReturnArgs>(args?: SelectSubset<T, ExamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Exam.
     * @param {ExamDeleteArgs} args - Arguments to delete one Exam.
     * @example
     * // Delete one Exam
     * const Exam = await prisma.exam.delete({
     *   where: {
     *     // ... filter to delete one Exam
     *   }
     * })
     * 
     */
    delete<T extends ExamDeleteArgs>(args: SelectSubset<T, ExamDeleteArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Exam.
     * @param {ExamUpdateArgs} args - Arguments to update one Exam.
     * @example
     * // Update one Exam
     * const exam = await prisma.exam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExamUpdateArgs>(args: SelectSubset<T, ExamUpdateArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Exams.
     * @param {ExamDeleteManyArgs} args - Arguments to filter Exams to delete.
     * @example
     * // Delete a few Exams
     * const { count } = await prisma.exam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExamDeleteManyArgs>(args?: SelectSubset<T, ExamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exams
     * const exam = await prisma.exam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExamUpdateManyArgs>(args: SelectSubset<T, ExamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Exam.
     * @param {ExamUpsertArgs} args - Arguments to update or create a Exam.
     * @example
     * // Update or create a Exam
     * const exam = await prisma.exam.upsert({
     *   create: {
     *     // ... data to create a Exam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exam we want to update
     *   }
     * })
     */
    upsert<T extends ExamUpsertArgs>(args: SelectSubset<T, ExamUpsertArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Exams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamCountArgs} args - Arguments to filter Exams to count.
     * @example
     * // Count the number of Exams
     * const count = await prisma.exam.count({
     *   where: {
     *     // ... the filter for the Exams we want to count
     *   }
     * })
    **/
    count<T extends ExamCountArgs>(
      args?: Subset<T, ExamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamAggregateArgs>(args: Subset<T, ExamAggregateArgs>): Prisma.PrismaPromise<GetExamAggregateType<T>>

    /**
     * Group by Exam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamGroupByArgs['orderBy'] }
        : { orderBy?: ExamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exam model
   */
  readonly fields: ExamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exam.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    questions<T extends Exam$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Exam$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany"> | Null>
    attempts<T extends Exam$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, Exam$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exam model
   */ 
  interface ExamFieldRefs {
    readonly id: FieldRef<"Exam", 'String'>
    readonly teacherId: FieldRef<"Exam", 'String'>
    readonly code: FieldRef<"Exam", 'String'>
    readonly title: FieldRef<"Exam", 'String'>
    readonly description: FieldRef<"Exam", 'String'>
    readonly durationMinutes: FieldRef<"Exam", 'Int'>
    readonly status: FieldRef<"Exam", 'String'>
    readonly allowMultipleAttempts: FieldRef<"Exam", 'Boolean'>
    readonly maxAttempts: FieldRef<"Exam", 'Int'>
    readonly targetStage: FieldRef<"Exam", 'String'>
    readonly targetGroup: FieldRef<"Exam", 'String'>
    readonly targetSemester: FieldRef<"Exam", 'String'>
    readonly startsAt: FieldRef<"Exam", 'DateTime'>
    readonly endsAt: FieldRef<"Exam", 'DateTime'>
    readonly examType: FieldRef<"Exam", 'String'>
    readonly showResultsDirectly: FieldRef<"Exam", 'Boolean'>
    readonly requirePhone: FieldRef<"Exam", 'Boolean'>
    readonly requireGroup: FieldRef<"Exam", 'Boolean'>
    readonly groupsList: FieldRef<"Exam", 'String'>
    readonly totalPoints: FieldRef<"Exam", 'Float'>
    readonly passingPercentage: FieldRef<"Exam", 'Float'>
    readonly createdAt: FieldRef<"Exam", 'DateTime'>
    readonly updatedAt: FieldRef<"Exam", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Exam findUnique
   */
  export type ExamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter, which Exam to fetch.
     */
    where: ExamWhereUniqueInput
  }

  /**
   * Exam findUniqueOrThrow
   */
  export type ExamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter, which Exam to fetch.
     */
    where: ExamWhereUniqueInput
  }

  /**
   * Exam findFirst
   */
  export type ExamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter, which Exam to fetch.
     */
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     */
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exams.
     */
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exams.
     */
    distinct?: ExamScalarFieldEnum | ExamScalarFieldEnum[]
  }

  /**
   * Exam findFirstOrThrow
   */
  export type ExamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter, which Exam to fetch.
     */
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     */
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exams.
     */
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exams.
     */
    distinct?: ExamScalarFieldEnum | ExamScalarFieldEnum[]
  }

  /**
   * Exam findMany
   */
  export type ExamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter, which Exams to fetch.
     */
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     */
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exams.
     */
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     */
    skip?: number
    distinct?: ExamScalarFieldEnum | ExamScalarFieldEnum[]
  }

  /**
   * Exam create
   */
  export type ExamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * The data needed to create a Exam.
     */
    data: XOR<ExamCreateInput, ExamUncheckedCreateInput>
  }

  /**
   * Exam createMany
   */
  export type ExamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exams.
     */
    data: ExamCreateManyInput | ExamCreateManyInput[]
  }

  /**
   * Exam createManyAndReturn
   */
  export type ExamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Exams.
     */
    data: ExamCreateManyInput | ExamCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exam update
   */
  export type ExamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * The data needed to update a Exam.
     */
    data: XOR<ExamUpdateInput, ExamUncheckedUpdateInput>
    /**
     * Choose, which Exam to update.
     */
    where: ExamWhereUniqueInput
  }

  /**
   * Exam updateMany
   */
  export type ExamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exams.
     */
    data: XOR<ExamUpdateManyMutationInput, ExamUncheckedUpdateManyInput>
    /**
     * Filter which Exams to update
     */
    where?: ExamWhereInput
  }

  /**
   * Exam upsert
   */
  export type ExamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * The filter to search for the Exam to update in case it exists.
     */
    where: ExamWhereUniqueInput
    /**
     * In case the Exam found by the `where` argument doesn't exist, create a new Exam with this data.
     */
    create: XOR<ExamCreateInput, ExamUncheckedCreateInput>
    /**
     * In case the Exam was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExamUpdateInput, ExamUncheckedUpdateInput>
  }

  /**
   * Exam delete
   */
  export type ExamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter which Exam to delete.
     */
    where: ExamWhereUniqueInput
  }

  /**
   * Exam deleteMany
   */
  export type ExamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exams to delete
     */
    where?: ExamWhereInput
  }

  /**
   * Exam.questions
   */
  export type Exam$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Exam.attempts
   */
  export type Exam$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    where?: ExamAttemptWhereInput
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    cursor?: ExamAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamAttemptScalarFieldEnum | ExamAttemptScalarFieldEnum[]
  }

  /**
   * Exam without action
   */
  export type ExamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionAvgAggregateOutputType = {
    questionNumber: number | null
    points: number | null
    orderIndex: number | null
  }

  export type QuestionSumAggregateOutputType = {
    questionNumber: number | null
    points: number | null
    orderIndex: number | null
  }

  export type QuestionMinAggregateOutputType = {
    id: string | null
    examId: string | null
    questionNumber: number | null
    type: string | null
    questionText: string | null
    points: number | null
    correctOptionId: string | null
    needsReview: boolean | null
    orderIndex: number | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: string | null
    examId: string | null
    questionNumber: number | null
    type: string | null
    questionText: string | null
    points: number | null
    correctOptionId: string | null
    needsReview: boolean | null
    orderIndex: number | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    examId: number
    questionNumber: number
    type: number
    questionText: number
    points: number
    correctOptionId: number
    needsReview: number
    orderIndex: number
    _all: number
  }


  export type QuestionAvgAggregateInputType = {
    questionNumber?: true
    points?: true
    orderIndex?: true
  }

  export type QuestionSumAggregateInputType = {
    questionNumber?: true
    points?: true
    orderIndex?: true
  }

  export type QuestionMinAggregateInputType = {
    id?: true
    examId?: true
    questionNumber?: true
    type?: true
    questionText?: true
    points?: true
    correctOptionId?: true
    needsReview?: true
    orderIndex?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    examId?: true
    questionNumber?: true
    type?: true
    questionText?: true
    points?: true
    correctOptionId?: true
    needsReview?: true
    orderIndex?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    examId?: true
    questionNumber?: true
    type?: true
    questionText?: true
    points?: true
    correctOptionId?: true
    needsReview?: true
    orderIndex?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _avg?: QuestionAvgAggregateInputType
    _sum?: QuestionSumAggregateInputType
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: string
    examId: string
    questionNumber: number
    type: string
    questionText: string
    points: number
    correctOptionId: string | null
    needsReview: boolean
    orderIndex: number
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examId?: boolean
    questionNumber?: boolean
    type?: boolean
    questionText?: boolean
    points?: boolean
    correctOptionId?: boolean
    needsReview?: boolean
    orderIndex?: boolean
    exam?: boolean | ExamDefaultArgs<ExtArgs>
    options?: boolean | Question$optionsArgs<ExtArgs>
    answers?: boolean | Question$answersArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examId?: boolean
    questionNumber?: boolean
    type?: boolean
    questionText?: boolean
    points?: boolean
    correctOptionId?: boolean
    needsReview?: boolean
    orderIndex?: boolean
    exam?: boolean | ExamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    id?: boolean
    examId?: boolean
    questionNumber?: boolean
    type?: boolean
    questionText?: boolean
    points?: boolean
    correctOptionId?: boolean
    needsReview?: boolean
    orderIndex?: boolean
  }

  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exam?: boolean | ExamDefaultArgs<ExtArgs>
    options?: boolean | Question$optionsArgs<ExtArgs>
    answers?: boolean | Question$answersArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exam?: boolean | ExamDefaultArgs<ExtArgs>
  }

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      exam: Prisma.$ExamPayload<ExtArgs>
      options: Prisma.$QuestionOptionPayload<ExtArgs>[]
      answers: Prisma.$StudentAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      examId: string
      questionNumber: number
      type: string
      questionText: string
      points: number
      correctOptionId: string | null
      needsReview: boolean
      orderIndex: number
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exam<T extends ExamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExamDefaultArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    options<T extends Question$optionsArgs<ExtArgs> = {}>(args?: Subset<T, Question$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findMany"> | Null>
    answers<T extends Question$answersArgs<ExtArgs> = {}>(args?: Subset<T, Question$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */ 
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'String'>
    readonly examId: FieldRef<"Question", 'String'>
    readonly questionNumber: FieldRef<"Question", 'Int'>
    readonly type: FieldRef<"Question", 'String'>
    readonly questionText: FieldRef<"Question", 'String'>
    readonly points: FieldRef<"Question", 'Float'>
    readonly correctOptionId: FieldRef<"Question", 'String'>
    readonly needsReview: FieldRef<"Question", 'Boolean'>
    readonly orderIndex: FieldRef<"Question", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
  }

  /**
   * Question.options
   */
  export type Question$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    where?: QuestionOptionWhereInput
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    cursor?: QuestionOptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * Question.answers
   */
  export type Question$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    where?: StudentAnswerWhereInput
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    cursor?: StudentAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model QuestionOption
   */

  export type AggregateQuestionOption = {
    _count: QuestionOptionCountAggregateOutputType | null
    _min: QuestionOptionMinAggregateOutputType | null
    _max: QuestionOptionMaxAggregateOutputType | null
  }

  export type QuestionOptionMinAggregateOutputType = {
    id: string | null
    questionId: string | null
    optionKey: string | null
    text: string | null
  }

  export type QuestionOptionMaxAggregateOutputType = {
    id: string | null
    questionId: string | null
    optionKey: string | null
    text: string | null
  }

  export type QuestionOptionCountAggregateOutputType = {
    id: number
    questionId: number
    optionKey: number
    text: number
    _all: number
  }


  export type QuestionOptionMinAggregateInputType = {
    id?: true
    questionId?: true
    optionKey?: true
    text?: true
  }

  export type QuestionOptionMaxAggregateInputType = {
    id?: true
    questionId?: true
    optionKey?: true
    text?: true
  }

  export type QuestionOptionCountAggregateInputType = {
    id?: true
    questionId?: true
    optionKey?: true
    text?: true
    _all?: true
  }

  export type QuestionOptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionOption to aggregate.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestionOptions
    **/
    _count?: true | QuestionOptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionOptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionOptionMaxAggregateInputType
  }

  export type GetQuestionOptionAggregateType<T extends QuestionOptionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestionOption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestionOption[P]>
      : GetScalarType<T[P], AggregateQuestionOption[P]>
  }




  export type QuestionOptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionOptionWhereInput
    orderBy?: QuestionOptionOrderByWithAggregationInput | QuestionOptionOrderByWithAggregationInput[]
    by: QuestionOptionScalarFieldEnum[] | QuestionOptionScalarFieldEnum
    having?: QuestionOptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionOptionCountAggregateInputType | true
    _min?: QuestionOptionMinAggregateInputType
    _max?: QuestionOptionMaxAggregateInputType
  }

  export type QuestionOptionGroupByOutputType = {
    id: string
    questionId: string
    optionKey: string
    text: string
    _count: QuestionOptionCountAggregateOutputType | null
    _min: QuestionOptionMinAggregateOutputType | null
    _max: QuestionOptionMaxAggregateOutputType | null
  }

  type GetQuestionOptionGroupByPayload<T extends QuestionOptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionOptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionOptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionOptionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionOptionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionOptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    optionKey?: boolean
    text?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionOption"]>

  export type QuestionOptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    optionKey?: boolean
    text?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionOption"]>

  export type QuestionOptionSelectScalar = {
    id?: boolean
    questionId?: boolean
    optionKey?: boolean
    text?: boolean
  }

  export type QuestionOptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type QuestionOptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $QuestionOptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestionOption"
    objects: {
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      questionId: string
      optionKey: string
      text: string
    }, ExtArgs["result"]["questionOption"]>
    composites: {}
  }

  type QuestionOptionGetPayload<S extends boolean | null | undefined | QuestionOptionDefaultArgs> = $Result.GetResult<Prisma.$QuestionOptionPayload, S>

  type QuestionOptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuestionOptionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuestionOptionCountAggregateInputType | true
    }

  export interface QuestionOptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestionOption'], meta: { name: 'QuestionOption' } }
    /**
     * Find zero or one QuestionOption that matches the filter.
     * @param {QuestionOptionFindUniqueArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionOptionFindUniqueArgs>(args: SelectSubset<T, QuestionOptionFindUniqueArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one QuestionOption that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuestionOptionFindUniqueOrThrowArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionOptionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first QuestionOption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionFindFirstArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionOptionFindFirstArgs>(args?: SelectSubset<T, QuestionOptionFindFirstArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first QuestionOption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionFindFirstOrThrowArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionOptionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more QuestionOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestionOptions
     * const questionOptions = await prisma.questionOption.findMany()
     * 
     * // Get first 10 QuestionOptions
     * const questionOptions = await prisma.questionOption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionOptionWithIdOnly = await prisma.questionOption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionOptionFindManyArgs>(args?: SelectSubset<T, QuestionOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a QuestionOption.
     * @param {QuestionOptionCreateArgs} args - Arguments to create a QuestionOption.
     * @example
     * // Create one QuestionOption
     * const QuestionOption = await prisma.questionOption.create({
     *   data: {
     *     // ... data to create a QuestionOption
     *   }
     * })
     * 
     */
    create<T extends QuestionOptionCreateArgs>(args: SelectSubset<T, QuestionOptionCreateArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many QuestionOptions.
     * @param {QuestionOptionCreateManyArgs} args - Arguments to create many QuestionOptions.
     * @example
     * // Create many QuestionOptions
     * const questionOption = await prisma.questionOption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionOptionCreateManyArgs>(args?: SelectSubset<T, QuestionOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuestionOptions and returns the data saved in the database.
     * @param {QuestionOptionCreateManyAndReturnArgs} args - Arguments to create many QuestionOptions.
     * @example
     * // Create many QuestionOptions
     * const questionOption = await prisma.questionOption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuestionOptions and only return the `id`
     * const questionOptionWithIdOnly = await prisma.questionOption.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionOptionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a QuestionOption.
     * @param {QuestionOptionDeleteArgs} args - Arguments to delete one QuestionOption.
     * @example
     * // Delete one QuestionOption
     * const QuestionOption = await prisma.questionOption.delete({
     *   where: {
     *     // ... filter to delete one QuestionOption
     *   }
     * })
     * 
     */
    delete<T extends QuestionOptionDeleteArgs>(args: SelectSubset<T, QuestionOptionDeleteArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one QuestionOption.
     * @param {QuestionOptionUpdateArgs} args - Arguments to update one QuestionOption.
     * @example
     * // Update one QuestionOption
     * const questionOption = await prisma.questionOption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionOptionUpdateArgs>(args: SelectSubset<T, QuestionOptionUpdateArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more QuestionOptions.
     * @param {QuestionOptionDeleteManyArgs} args - Arguments to filter QuestionOptions to delete.
     * @example
     * // Delete a few QuestionOptions
     * const { count } = await prisma.questionOption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionOptionDeleteManyArgs>(args?: SelectSubset<T, QuestionOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestionOptions
     * const questionOption = await prisma.questionOption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionOptionUpdateManyArgs>(args: SelectSubset<T, QuestionOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QuestionOption.
     * @param {QuestionOptionUpsertArgs} args - Arguments to update or create a QuestionOption.
     * @example
     * // Update or create a QuestionOption
     * const questionOption = await prisma.questionOption.upsert({
     *   create: {
     *     // ... data to create a QuestionOption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestionOption we want to update
     *   }
     * })
     */
    upsert<T extends QuestionOptionUpsertArgs>(args: SelectSubset<T, QuestionOptionUpsertArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of QuestionOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionCountArgs} args - Arguments to filter QuestionOptions to count.
     * @example
     * // Count the number of QuestionOptions
     * const count = await prisma.questionOption.count({
     *   where: {
     *     // ... the filter for the QuestionOptions we want to count
     *   }
     * })
    **/
    count<T extends QuestionOptionCountArgs>(
      args?: Subset<T, QuestionOptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionOptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestionOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionOptionAggregateArgs>(args: Subset<T, QuestionOptionAggregateArgs>): Prisma.PrismaPromise<GetQuestionOptionAggregateType<T>>

    /**
     * Group by QuestionOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionOptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionOptionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionOptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestionOption model
   */
  readonly fields: QuestionOptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestionOption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionOptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuestionOption model
   */ 
  interface QuestionOptionFieldRefs {
    readonly id: FieldRef<"QuestionOption", 'String'>
    readonly questionId: FieldRef<"QuestionOption", 'String'>
    readonly optionKey: FieldRef<"QuestionOption", 'String'>
    readonly text: FieldRef<"QuestionOption", 'String'>
  }
    

  // Custom InputTypes
  /**
   * QuestionOption findUnique
   */
  export type QuestionOptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption findUniqueOrThrow
   */
  export type QuestionOptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption findFirst
   */
  export type QuestionOptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionOptions.
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionOptions.
     */
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * QuestionOption findFirstOrThrow
   */
  export type QuestionOptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionOptions.
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionOptions.
     */
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * QuestionOption findMany
   */
  export type QuestionOptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOptions to fetch.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestionOptions.
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * QuestionOption create
   */
  export type QuestionOptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * The data needed to create a QuestionOption.
     */
    data: XOR<QuestionOptionCreateInput, QuestionOptionUncheckedCreateInput>
  }

  /**
   * QuestionOption createMany
   */
  export type QuestionOptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestionOptions.
     */
    data: QuestionOptionCreateManyInput | QuestionOptionCreateManyInput[]
  }

  /**
   * QuestionOption createManyAndReturn
   */
  export type QuestionOptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QuestionOptions.
     */
    data: QuestionOptionCreateManyInput | QuestionOptionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionOption update
   */
  export type QuestionOptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * The data needed to update a QuestionOption.
     */
    data: XOR<QuestionOptionUpdateInput, QuestionOptionUncheckedUpdateInput>
    /**
     * Choose, which QuestionOption to update.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption updateMany
   */
  export type QuestionOptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestionOptions.
     */
    data: XOR<QuestionOptionUpdateManyMutationInput, QuestionOptionUncheckedUpdateManyInput>
    /**
     * Filter which QuestionOptions to update
     */
    where?: QuestionOptionWhereInput
  }

  /**
   * QuestionOption upsert
   */
  export type QuestionOptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * The filter to search for the QuestionOption to update in case it exists.
     */
    where: QuestionOptionWhereUniqueInput
    /**
     * In case the QuestionOption found by the `where` argument doesn't exist, create a new QuestionOption with this data.
     */
    create: XOR<QuestionOptionCreateInput, QuestionOptionUncheckedCreateInput>
    /**
     * In case the QuestionOption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionOptionUpdateInput, QuestionOptionUncheckedUpdateInput>
  }

  /**
   * QuestionOption delete
   */
  export type QuestionOptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter which QuestionOption to delete.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption deleteMany
   */
  export type QuestionOptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionOptions to delete
     */
    where?: QuestionOptionWhereInput
  }

  /**
   * QuestionOption without action
   */
  export type QuestionOptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
  }


  /**
   * Model ExamAttempt
   */

  export type AggregateExamAttempt = {
    _count: ExamAttemptCountAggregateOutputType | null
    _avg: ExamAttemptAvgAggregateOutputType | null
    _sum: ExamAttemptSumAggregateOutputType | null
    _min: ExamAttemptMinAggregateOutputType | null
    _max: ExamAttemptMaxAggregateOutputType | null
  }

  export type ExamAttemptAvgAggregateOutputType = {
    timeSpentSeconds: number | null
    mcqScore: number | null
    essayScore: number | null
    totalScore: number | null
    maxScore: number | null
    percentage: number | null
  }

  export type ExamAttemptSumAggregateOutputType = {
    timeSpentSeconds: number | null
    mcqScore: number | null
    essayScore: number | null
    totalScore: number | null
    maxScore: number | null
    percentage: number | null
  }

  export type ExamAttemptMinAggregateOutputType = {
    id: string | null
    examId: string | null
    studentId: string | null
    studentName: string | null
    studentPhone: string | null
    studentGroup: string | null
    extraData: string | null
    startedAt: Date | null
    submittedAt: Date | null
    timeSpentSeconds: number | null
    status: string | null
    isApproved: boolean | null
    approvedAt: Date | null
    approvedBy: string | null
    teacherNotes: string | null
    mcqScore: number | null
    essayScore: number | null
    totalScore: number | null
    maxScore: number | null
    percentage: number | null
    isPassed: boolean | null
    createdAt: Date | null
  }

  export type ExamAttemptMaxAggregateOutputType = {
    id: string | null
    examId: string | null
    studentId: string | null
    studentName: string | null
    studentPhone: string | null
    studentGroup: string | null
    extraData: string | null
    startedAt: Date | null
    submittedAt: Date | null
    timeSpentSeconds: number | null
    status: string | null
    isApproved: boolean | null
    approvedAt: Date | null
    approvedBy: string | null
    teacherNotes: string | null
    mcqScore: number | null
    essayScore: number | null
    totalScore: number | null
    maxScore: number | null
    percentage: number | null
    isPassed: boolean | null
    createdAt: Date | null
  }

  export type ExamAttemptCountAggregateOutputType = {
    id: number
    examId: number
    studentId: number
    studentName: number
    studentPhone: number
    studentGroup: number
    extraData: number
    startedAt: number
    submittedAt: number
    timeSpentSeconds: number
    status: number
    isApproved: number
    approvedAt: number
    approvedBy: number
    teacherNotes: number
    mcqScore: number
    essayScore: number
    totalScore: number
    maxScore: number
    percentage: number
    isPassed: number
    createdAt: number
    _all: number
  }


  export type ExamAttemptAvgAggregateInputType = {
    timeSpentSeconds?: true
    mcqScore?: true
    essayScore?: true
    totalScore?: true
    maxScore?: true
    percentage?: true
  }

  export type ExamAttemptSumAggregateInputType = {
    timeSpentSeconds?: true
    mcqScore?: true
    essayScore?: true
    totalScore?: true
    maxScore?: true
    percentage?: true
  }

  export type ExamAttemptMinAggregateInputType = {
    id?: true
    examId?: true
    studentId?: true
    studentName?: true
    studentPhone?: true
    studentGroup?: true
    extraData?: true
    startedAt?: true
    submittedAt?: true
    timeSpentSeconds?: true
    status?: true
    isApproved?: true
    approvedAt?: true
    approvedBy?: true
    teacherNotes?: true
    mcqScore?: true
    essayScore?: true
    totalScore?: true
    maxScore?: true
    percentage?: true
    isPassed?: true
    createdAt?: true
  }

  export type ExamAttemptMaxAggregateInputType = {
    id?: true
    examId?: true
    studentId?: true
    studentName?: true
    studentPhone?: true
    studentGroup?: true
    extraData?: true
    startedAt?: true
    submittedAt?: true
    timeSpentSeconds?: true
    status?: true
    isApproved?: true
    approvedAt?: true
    approvedBy?: true
    teacherNotes?: true
    mcqScore?: true
    essayScore?: true
    totalScore?: true
    maxScore?: true
    percentage?: true
    isPassed?: true
    createdAt?: true
  }

  export type ExamAttemptCountAggregateInputType = {
    id?: true
    examId?: true
    studentId?: true
    studentName?: true
    studentPhone?: true
    studentGroup?: true
    extraData?: true
    startedAt?: true
    submittedAt?: true
    timeSpentSeconds?: true
    status?: true
    isApproved?: true
    approvedAt?: true
    approvedBy?: true
    teacherNotes?: true
    mcqScore?: true
    essayScore?: true
    totalScore?: true
    maxScore?: true
    percentage?: true
    isPassed?: true
    createdAt?: true
    _all?: true
  }

  export type ExamAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExamAttempt to aggregate.
     */
    where?: ExamAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttempts to fetch.
     */
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExamAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExamAttempts
    **/
    _count?: true | ExamAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamAttemptMaxAggregateInputType
  }

  export type GetExamAttemptAggregateType<T extends ExamAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateExamAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExamAttempt[P]>
      : GetScalarType<T[P], AggregateExamAttempt[P]>
  }




  export type ExamAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamAttemptWhereInput
    orderBy?: ExamAttemptOrderByWithAggregationInput | ExamAttemptOrderByWithAggregationInput[]
    by: ExamAttemptScalarFieldEnum[] | ExamAttemptScalarFieldEnum
    having?: ExamAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamAttemptCountAggregateInputType | true
    _avg?: ExamAttemptAvgAggregateInputType
    _sum?: ExamAttemptSumAggregateInputType
    _min?: ExamAttemptMinAggregateInputType
    _max?: ExamAttemptMaxAggregateInputType
  }

  export type ExamAttemptGroupByOutputType = {
    id: string
    examId: string
    studentId: string | null
    studentName: string
    studentPhone: string
    studentGroup: string | null
    extraData: string | null
    startedAt: Date
    submittedAt: Date | null
    timeSpentSeconds: number
    status: string
    isApproved: boolean
    approvedAt: Date | null
    approvedBy: string | null
    teacherNotes: string | null
    mcqScore: number
    essayScore: number
    totalScore: number
    maxScore: number
    percentage: number
    isPassed: boolean
    createdAt: Date
    _count: ExamAttemptCountAggregateOutputType | null
    _avg: ExamAttemptAvgAggregateOutputType | null
    _sum: ExamAttemptSumAggregateOutputType | null
    _min: ExamAttemptMinAggregateOutputType | null
    _max: ExamAttemptMaxAggregateOutputType | null
  }

  type GetExamAttemptGroupByPayload<T extends ExamAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExamAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], ExamAttemptGroupByOutputType[P]>
        }
      >
    >


  export type ExamAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examId?: boolean
    studentId?: boolean
    studentName?: boolean
    studentPhone?: boolean
    studentGroup?: boolean
    extraData?: boolean
    startedAt?: boolean
    submittedAt?: boolean
    timeSpentSeconds?: boolean
    status?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    teacherNotes?: boolean
    mcqScore?: boolean
    essayScore?: boolean
    totalScore?: boolean
    maxScore?: boolean
    percentage?: boolean
    isPassed?: boolean
    createdAt?: boolean
    exam?: boolean | ExamDefaultArgs<ExtArgs>
    student?: boolean | ExamAttempt$studentArgs<ExtArgs>
    answers?: boolean | ExamAttempt$answersArgs<ExtArgs>
    _count?: boolean | ExamAttemptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examAttempt"]>

  export type ExamAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examId?: boolean
    studentId?: boolean
    studentName?: boolean
    studentPhone?: boolean
    studentGroup?: boolean
    extraData?: boolean
    startedAt?: boolean
    submittedAt?: boolean
    timeSpentSeconds?: boolean
    status?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    teacherNotes?: boolean
    mcqScore?: boolean
    essayScore?: boolean
    totalScore?: boolean
    maxScore?: boolean
    percentage?: boolean
    isPassed?: boolean
    createdAt?: boolean
    exam?: boolean | ExamDefaultArgs<ExtArgs>
    student?: boolean | ExamAttempt$studentArgs<ExtArgs>
  }, ExtArgs["result"]["examAttempt"]>

  export type ExamAttemptSelectScalar = {
    id?: boolean
    examId?: boolean
    studentId?: boolean
    studentName?: boolean
    studentPhone?: boolean
    studentGroup?: boolean
    extraData?: boolean
    startedAt?: boolean
    submittedAt?: boolean
    timeSpentSeconds?: boolean
    status?: boolean
    isApproved?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    teacherNotes?: boolean
    mcqScore?: boolean
    essayScore?: boolean
    totalScore?: boolean
    maxScore?: boolean
    percentage?: boolean
    isPassed?: boolean
    createdAt?: boolean
  }

  export type ExamAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exam?: boolean | ExamDefaultArgs<ExtArgs>
    student?: boolean | ExamAttempt$studentArgs<ExtArgs>
    answers?: boolean | ExamAttempt$answersArgs<ExtArgs>
    _count?: boolean | ExamAttemptCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExamAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exam?: boolean | ExamDefaultArgs<ExtArgs>
    student?: boolean | ExamAttempt$studentArgs<ExtArgs>
  }

  export type $ExamAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExamAttempt"
    objects: {
      exam: Prisma.$ExamPayload<ExtArgs>
      student: Prisma.$StudentPayload<ExtArgs> | null
      answers: Prisma.$StudentAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      examId: string
      studentId: string | null
      studentName: string
      studentPhone: string
      studentGroup: string | null
      extraData: string | null
      startedAt: Date
      submittedAt: Date | null
      timeSpentSeconds: number
      status: string
      isApproved: boolean
      approvedAt: Date | null
      approvedBy: string | null
      teacherNotes: string | null
      mcqScore: number
      essayScore: number
      totalScore: number
      maxScore: number
      percentage: number
      isPassed: boolean
      createdAt: Date
    }, ExtArgs["result"]["examAttempt"]>
    composites: {}
  }

  type ExamAttemptGetPayload<S extends boolean | null | undefined | ExamAttemptDefaultArgs> = $Result.GetResult<Prisma.$ExamAttemptPayload, S>

  type ExamAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExamAttemptFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExamAttemptCountAggregateInputType | true
    }

  export interface ExamAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExamAttempt'], meta: { name: 'ExamAttempt' } }
    /**
     * Find zero or one ExamAttempt that matches the filter.
     * @param {ExamAttemptFindUniqueArgs} args - Arguments to find a ExamAttempt
     * @example
     * // Get one ExamAttempt
     * const examAttempt = await prisma.examAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExamAttemptFindUniqueArgs>(args: SelectSubset<T, ExamAttemptFindUniqueArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExamAttempt that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExamAttemptFindUniqueOrThrowArgs} args - Arguments to find a ExamAttempt
     * @example
     * // Get one ExamAttempt
     * const examAttempt = await prisma.examAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExamAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, ExamAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExamAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptFindFirstArgs} args - Arguments to find a ExamAttempt
     * @example
     * // Get one ExamAttempt
     * const examAttempt = await prisma.examAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExamAttemptFindFirstArgs>(args?: SelectSubset<T, ExamAttemptFindFirstArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExamAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptFindFirstOrThrowArgs} args - Arguments to find a ExamAttempt
     * @example
     * // Get one ExamAttempt
     * const examAttempt = await prisma.examAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExamAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, ExamAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExamAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExamAttempts
     * const examAttempts = await prisma.examAttempt.findMany()
     * 
     * // Get first 10 ExamAttempts
     * const examAttempts = await prisma.examAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const examAttemptWithIdOnly = await prisma.examAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExamAttemptFindManyArgs>(args?: SelectSubset<T, ExamAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExamAttempt.
     * @param {ExamAttemptCreateArgs} args - Arguments to create a ExamAttempt.
     * @example
     * // Create one ExamAttempt
     * const ExamAttempt = await prisma.examAttempt.create({
     *   data: {
     *     // ... data to create a ExamAttempt
     *   }
     * })
     * 
     */
    create<T extends ExamAttemptCreateArgs>(args: SelectSubset<T, ExamAttemptCreateArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExamAttempts.
     * @param {ExamAttemptCreateManyArgs} args - Arguments to create many ExamAttempts.
     * @example
     * // Create many ExamAttempts
     * const examAttempt = await prisma.examAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExamAttemptCreateManyArgs>(args?: SelectSubset<T, ExamAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExamAttempts and returns the data saved in the database.
     * @param {ExamAttemptCreateManyAndReturnArgs} args - Arguments to create many ExamAttempts.
     * @example
     * // Create many ExamAttempts
     * const examAttempt = await prisma.examAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExamAttempts and only return the `id`
     * const examAttemptWithIdOnly = await prisma.examAttempt.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExamAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, ExamAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExamAttempt.
     * @param {ExamAttemptDeleteArgs} args - Arguments to delete one ExamAttempt.
     * @example
     * // Delete one ExamAttempt
     * const ExamAttempt = await prisma.examAttempt.delete({
     *   where: {
     *     // ... filter to delete one ExamAttempt
     *   }
     * })
     * 
     */
    delete<T extends ExamAttemptDeleteArgs>(args: SelectSubset<T, ExamAttemptDeleteArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExamAttempt.
     * @param {ExamAttemptUpdateArgs} args - Arguments to update one ExamAttempt.
     * @example
     * // Update one ExamAttempt
     * const examAttempt = await prisma.examAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExamAttemptUpdateArgs>(args: SelectSubset<T, ExamAttemptUpdateArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExamAttempts.
     * @param {ExamAttemptDeleteManyArgs} args - Arguments to filter ExamAttempts to delete.
     * @example
     * // Delete a few ExamAttempts
     * const { count } = await prisma.examAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExamAttemptDeleteManyArgs>(args?: SelectSubset<T, ExamAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExamAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExamAttempts
     * const examAttempt = await prisma.examAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExamAttemptUpdateManyArgs>(args: SelectSubset<T, ExamAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExamAttempt.
     * @param {ExamAttemptUpsertArgs} args - Arguments to update or create a ExamAttempt.
     * @example
     * // Update or create a ExamAttempt
     * const examAttempt = await prisma.examAttempt.upsert({
     *   create: {
     *     // ... data to create a ExamAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExamAttempt we want to update
     *   }
     * })
     */
    upsert<T extends ExamAttemptUpsertArgs>(args: SelectSubset<T, ExamAttemptUpsertArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExamAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptCountArgs} args - Arguments to filter ExamAttempts to count.
     * @example
     * // Count the number of ExamAttempts
     * const count = await prisma.examAttempt.count({
     *   where: {
     *     // ... the filter for the ExamAttempts we want to count
     *   }
     * })
    **/
    count<T extends ExamAttemptCountArgs>(
      args?: Subset<T, ExamAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExamAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamAttemptAggregateArgs>(args: Subset<T, ExamAttemptAggregateArgs>): Prisma.PrismaPromise<GetExamAttemptAggregateType<T>>

    /**
     * Group by ExamAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamAttemptGroupByArgs['orderBy'] }
        : { orderBy?: ExamAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExamAttempt model
   */
  readonly fields: ExamAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExamAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExamAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exam<T extends ExamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExamDefaultArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    student<T extends ExamAttempt$studentArgs<ExtArgs> = {}>(args?: Subset<T, ExamAttempt$studentArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    answers<T extends ExamAttempt$answersArgs<ExtArgs> = {}>(args?: Subset<T, ExamAttempt$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExamAttempt model
   */ 
  interface ExamAttemptFieldRefs {
    readonly id: FieldRef<"ExamAttempt", 'String'>
    readonly examId: FieldRef<"ExamAttempt", 'String'>
    readonly studentId: FieldRef<"ExamAttempt", 'String'>
    readonly studentName: FieldRef<"ExamAttempt", 'String'>
    readonly studentPhone: FieldRef<"ExamAttempt", 'String'>
    readonly studentGroup: FieldRef<"ExamAttempt", 'String'>
    readonly extraData: FieldRef<"ExamAttempt", 'String'>
    readonly startedAt: FieldRef<"ExamAttempt", 'DateTime'>
    readonly submittedAt: FieldRef<"ExamAttempt", 'DateTime'>
    readonly timeSpentSeconds: FieldRef<"ExamAttempt", 'Int'>
    readonly status: FieldRef<"ExamAttempt", 'String'>
    readonly isApproved: FieldRef<"ExamAttempt", 'Boolean'>
    readonly approvedAt: FieldRef<"ExamAttempt", 'DateTime'>
    readonly approvedBy: FieldRef<"ExamAttempt", 'String'>
    readonly teacherNotes: FieldRef<"ExamAttempt", 'String'>
    readonly mcqScore: FieldRef<"ExamAttempt", 'Float'>
    readonly essayScore: FieldRef<"ExamAttempt", 'Float'>
    readonly totalScore: FieldRef<"ExamAttempt", 'Float'>
    readonly maxScore: FieldRef<"ExamAttempt", 'Float'>
    readonly percentage: FieldRef<"ExamAttempt", 'Float'>
    readonly isPassed: FieldRef<"ExamAttempt", 'Boolean'>
    readonly createdAt: FieldRef<"ExamAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExamAttempt findUnique
   */
  export type ExamAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ExamAttempt to fetch.
     */
    where: ExamAttemptWhereUniqueInput
  }

  /**
   * ExamAttempt findUniqueOrThrow
   */
  export type ExamAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ExamAttempt to fetch.
     */
    where: ExamAttemptWhereUniqueInput
  }

  /**
   * ExamAttempt findFirst
   */
  export type ExamAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ExamAttempt to fetch.
     */
    where?: ExamAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttempts to fetch.
     */
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamAttempts.
     */
    cursor?: ExamAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamAttempts.
     */
    distinct?: ExamAttemptScalarFieldEnum | ExamAttemptScalarFieldEnum[]
  }

  /**
   * ExamAttempt findFirstOrThrow
   */
  export type ExamAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ExamAttempt to fetch.
     */
    where?: ExamAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttempts to fetch.
     */
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamAttempts.
     */
    cursor?: ExamAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamAttempts.
     */
    distinct?: ExamAttemptScalarFieldEnum | ExamAttemptScalarFieldEnum[]
  }

  /**
   * ExamAttempt findMany
   */
  export type ExamAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ExamAttempts to fetch.
     */
    where?: ExamAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamAttempts to fetch.
     */
    orderBy?: ExamAttemptOrderByWithRelationInput | ExamAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExamAttempts.
     */
    cursor?: ExamAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamAttempts.
     */
    skip?: number
    distinct?: ExamAttemptScalarFieldEnum | ExamAttemptScalarFieldEnum[]
  }

  /**
   * ExamAttempt create
   */
  export type ExamAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a ExamAttempt.
     */
    data: XOR<ExamAttemptCreateInput, ExamAttemptUncheckedCreateInput>
  }

  /**
   * ExamAttempt createMany
   */
  export type ExamAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExamAttempts.
     */
    data: ExamAttemptCreateManyInput | ExamAttemptCreateManyInput[]
  }

  /**
   * ExamAttempt createManyAndReturn
   */
  export type ExamAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExamAttempts.
     */
    data: ExamAttemptCreateManyInput | ExamAttemptCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExamAttempt update
   */
  export type ExamAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a ExamAttempt.
     */
    data: XOR<ExamAttemptUpdateInput, ExamAttemptUncheckedUpdateInput>
    /**
     * Choose, which ExamAttempt to update.
     */
    where: ExamAttemptWhereUniqueInput
  }

  /**
   * ExamAttempt updateMany
   */
  export type ExamAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExamAttempts.
     */
    data: XOR<ExamAttemptUpdateManyMutationInput, ExamAttemptUncheckedUpdateManyInput>
    /**
     * Filter which ExamAttempts to update
     */
    where?: ExamAttemptWhereInput
  }

  /**
   * ExamAttempt upsert
   */
  export type ExamAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the ExamAttempt to update in case it exists.
     */
    where: ExamAttemptWhereUniqueInput
    /**
     * In case the ExamAttempt found by the `where` argument doesn't exist, create a new ExamAttempt with this data.
     */
    create: XOR<ExamAttemptCreateInput, ExamAttemptUncheckedCreateInput>
    /**
     * In case the ExamAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExamAttemptUpdateInput, ExamAttemptUncheckedUpdateInput>
  }

  /**
   * ExamAttempt delete
   */
  export type ExamAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
    /**
     * Filter which ExamAttempt to delete.
     */
    where: ExamAttemptWhereUniqueInput
  }

  /**
   * ExamAttempt deleteMany
   */
  export type ExamAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExamAttempts to delete
     */
    where?: ExamAttemptWhereInput
  }

  /**
   * ExamAttempt.student
   */
  export type ExamAttempt$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
  }

  /**
   * ExamAttempt.answers
   */
  export type ExamAttempt$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    where?: StudentAnswerWhereInput
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    cursor?: StudentAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * ExamAttempt without action
   */
  export type ExamAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamAttempt
     */
    select?: ExamAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamAttemptInclude<ExtArgs> | null
  }


  /**
   * Model StudentAnswer
   */

  export type AggregateStudentAnswer = {
    _count: StudentAnswerCountAggregateOutputType | null
    _avg: StudentAnswerAvgAggregateOutputType | null
    _sum: StudentAnswerSumAggregateOutputType | null
    _min: StudentAnswerMinAggregateOutputType | null
    _max: StudentAnswerMaxAggregateOutputType | null
  }

  export type StudentAnswerAvgAggregateOutputType = {
    pointsAwarded: number | null
  }

  export type StudentAnswerSumAggregateOutputType = {
    pointsAwarded: number | null
  }

  export type StudentAnswerMinAggregateOutputType = {
    id: string | null
    attemptId: string | null
    questionId: string | null
    selectedOption: string | null
    essayAnswer: string | null
    isCorrect: boolean | null
    pointsAwarded: number | null
    teacherFeedback: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentAnswerMaxAggregateOutputType = {
    id: string | null
    attemptId: string | null
    questionId: string | null
    selectedOption: string | null
    essayAnswer: string | null
    isCorrect: boolean | null
    pointsAwarded: number | null
    teacherFeedback: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentAnswerCountAggregateOutputType = {
    id: number
    attemptId: number
    questionId: number
    selectedOption: number
    essayAnswer: number
    isCorrect: number
    pointsAwarded: number
    teacherFeedback: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentAnswerAvgAggregateInputType = {
    pointsAwarded?: true
  }

  export type StudentAnswerSumAggregateInputType = {
    pointsAwarded?: true
  }

  export type StudentAnswerMinAggregateInputType = {
    id?: true
    attemptId?: true
    questionId?: true
    selectedOption?: true
    essayAnswer?: true
    isCorrect?: true
    pointsAwarded?: true
    teacherFeedback?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentAnswerMaxAggregateInputType = {
    id?: true
    attemptId?: true
    questionId?: true
    selectedOption?: true
    essayAnswer?: true
    isCorrect?: true
    pointsAwarded?: true
    teacherFeedback?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentAnswerCountAggregateInputType = {
    id?: true
    attemptId?: true
    questionId?: true
    selectedOption?: true
    essayAnswer?: true
    isCorrect?: true
    pointsAwarded?: true
    teacherFeedback?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentAnswer to aggregate.
     */
    where?: StudentAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAnswers to fetch.
     */
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentAnswers
    **/
    _count?: true | StudentAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAnswerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentAnswerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentAnswerMaxAggregateInputType
  }

  export type GetStudentAnswerAggregateType<T extends StudentAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentAnswer[P]>
      : GetScalarType<T[P], AggregateStudentAnswer[P]>
  }




  export type StudentAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentAnswerWhereInput
    orderBy?: StudentAnswerOrderByWithAggregationInput | StudentAnswerOrderByWithAggregationInput[]
    by: StudentAnswerScalarFieldEnum[] | StudentAnswerScalarFieldEnum
    having?: StudentAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentAnswerCountAggregateInputType | true
    _avg?: StudentAnswerAvgAggregateInputType
    _sum?: StudentAnswerSumAggregateInputType
    _min?: StudentAnswerMinAggregateInputType
    _max?: StudentAnswerMaxAggregateInputType
  }

  export type StudentAnswerGroupByOutputType = {
    id: string
    attemptId: string
    questionId: string
    selectedOption: string | null
    essayAnswer: string | null
    isCorrect: boolean | null
    pointsAwarded: number
    teacherFeedback: string | null
    createdAt: Date
    updatedAt: Date
    _count: StudentAnswerCountAggregateOutputType | null
    _avg: StudentAnswerAvgAggregateOutputType | null
    _sum: StudentAnswerSumAggregateOutputType | null
    _min: StudentAnswerMinAggregateOutputType | null
    _max: StudentAnswerMaxAggregateOutputType | null
  }

  type GetStudentAnswerGroupByPayload<T extends StudentAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], StudentAnswerGroupByOutputType[P]>
        }
      >
    >


  export type StudentAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attemptId?: boolean
    questionId?: boolean
    selectedOption?: boolean
    essayAnswer?: boolean
    isCorrect?: boolean
    pointsAwarded?: boolean
    teacherFeedback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attempt?: boolean | ExamAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentAnswer"]>

  export type StudentAnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attemptId?: boolean
    questionId?: boolean
    selectedOption?: boolean
    essayAnswer?: boolean
    isCorrect?: boolean
    pointsAwarded?: boolean
    teacherFeedback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attempt?: boolean | ExamAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentAnswer"]>

  export type StudentAnswerSelectScalar = {
    id?: boolean
    attemptId?: boolean
    questionId?: boolean
    selectedOption?: boolean
    essayAnswer?: boolean
    isCorrect?: boolean
    pointsAwarded?: boolean
    teacherFeedback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempt?: boolean | ExamAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type StudentAnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempt?: boolean | ExamAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $StudentAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentAnswer"
    objects: {
      attempt: Prisma.$ExamAttemptPayload<ExtArgs>
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      attemptId: string
      questionId: string
      selectedOption: string | null
      essayAnswer: string | null
      isCorrect: boolean | null
      pointsAwarded: number
      teacherFeedback: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["studentAnswer"]>
    composites: {}
  }

  type StudentAnswerGetPayload<S extends boolean | null | undefined | StudentAnswerDefaultArgs> = $Result.GetResult<Prisma.$StudentAnswerPayload, S>

  type StudentAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentAnswerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentAnswerCountAggregateInputType | true
    }

  export interface StudentAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentAnswer'], meta: { name: 'StudentAnswer' } }
    /**
     * Find zero or one StudentAnswer that matches the filter.
     * @param {StudentAnswerFindUniqueArgs} args - Arguments to find a StudentAnswer
     * @example
     * // Get one StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentAnswerFindUniqueArgs>(args: SelectSubset<T, StudentAnswerFindUniqueArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StudentAnswer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentAnswerFindUniqueOrThrowArgs} args - Arguments to find a StudentAnswer
     * @example
     * // Get one StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StudentAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerFindFirstArgs} args - Arguments to find a StudentAnswer
     * @example
     * // Get one StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentAnswerFindFirstArgs>(args?: SelectSubset<T, StudentAnswerFindFirstArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StudentAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerFindFirstOrThrowArgs} args - Arguments to find a StudentAnswer
     * @example
     * // Get one StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StudentAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentAnswers
     * const studentAnswers = await prisma.studentAnswer.findMany()
     * 
     * // Get first 10 StudentAnswers
     * const studentAnswers = await prisma.studentAnswer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentAnswerWithIdOnly = await prisma.studentAnswer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentAnswerFindManyArgs>(args?: SelectSubset<T, StudentAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StudentAnswer.
     * @param {StudentAnswerCreateArgs} args - Arguments to create a StudentAnswer.
     * @example
     * // Create one StudentAnswer
     * const StudentAnswer = await prisma.studentAnswer.create({
     *   data: {
     *     // ... data to create a StudentAnswer
     *   }
     * })
     * 
     */
    create<T extends StudentAnswerCreateArgs>(args: SelectSubset<T, StudentAnswerCreateArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StudentAnswers.
     * @param {StudentAnswerCreateManyArgs} args - Arguments to create many StudentAnswers.
     * @example
     * // Create many StudentAnswers
     * const studentAnswer = await prisma.studentAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentAnswerCreateManyArgs>(args?: SelectSubset<T, StudentAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentAnswers and returns the data saved in the database.
     * @param {StudentAnswerCreateManyAndReturnArgs} args - Arguments to create many StudentAnswers.
     * @example
     * // Create many StudentAnswers
     * const studentAnswer = await prisma.studentAnswer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentAnswers and only return the `id`
     * const studentAnswerWithIdOnly = await prisma.studentAnswer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentAnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StudentAnswer.
     * @param {StudentAnswerDeleteArgs} args - Arguments to delete one StudentAnswer.
     * @example
     * // Delete one StudentAnswer
     * const StudentAnswer = await prisma.studentAnswer.delete({
     *   where: {
     *     // ... filter to delete one StudentAnswer
     *   }
     * })
     * 
     */
    delete<T extends StudentAnswerDeleteArgs>(args: SelectSubset<T, StudentAnswerDeleteArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StudentAnswer.
     * @param {StudentAnswerUpdateArgs} args - Arguments to update one StudentAnswer.
     * @example
     * // Update one StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentAnswerUpdateArgs>(args: SelectSubset<T, StudentAnswerUpdateArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StudentAnswers.
     * @param {StudentAnswerDeleteManyArgs} args - Arguments to filter StudentAnswers to delete.
     * @example
     * // Delete a few StudentAnswers
     * const { count } = await prisma.studentAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentAnswerDeleteManyArgs>(args?: SelectSubset<T, StudentAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentAnswers
     * const studentAnswer = await prisma.studentAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentAnswerUpdateManyArgs>(args: SelectSubset<T, StudentAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StudentAnswer.
     * @param {StudentAnswerUpsertArgs} args - Arguments to update or create a StudentAnswer.
     * @example
     * // Update or create a StudentAnswer
     * const studentAnswer = await prisma.studentAnswer.upsert({
     *   create: {
     *     // ... data to create a StudentAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentAnswer we want to update
     *   }
     * })
     */
    upsert<T extends StudentAnswerUpsertArgs>(args: SelectSubset<T, StudentAnswerUpsertArgs<ExtArgs>>): Prisma__StudentAnswerClient<$Result.GetResult<Prisma.$StudentAnswerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StudentAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerCountArgs} args - Arguments to filter StudentAnswers to count.
     * @example
     * // Count the number of StudentAnswers
     * const count = await prisma.studentAnswer.count({
     *   where: {
     *     // ... the filter for the StudentAnswers we want to count
     *   }
     * })
    **/
    count<T extends StudentAnswerCountArgs>(
      args?: Subset<T, StudentAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAnswerAggregateArgs>(args: Subset<T, StudentAnswerAggregateArgs>): Prisma.PrismaPromise<GetStudentAnswerAggregateType<T>>

    /**
     * Group by StudentAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentAnswerGroupByArgs['orderBy'] }
        : { orderBy?: StudentAnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentAnswer model
   */
  readonly fields: StudentAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attempt<T extends ExamAttemptDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExamAttemptDefaultArgs<ExtArgs>>): Prisma__ExamAttemptClient<$Result.GetResult<Prisma.$ExamAttemptPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentAnswer model
   */ 
  interface StudentAnswerFieldRefs {
    readonly id: FieldRef<"StudentAnswer", 'String'>
    readonly attemptId: FieldRef<"StudentAnswer", 'String'>
    readonly questionId: FieldRef<"StudentAnswer", 'String'>
    readonly selectedOption: FieldRef<"StudentAnswer", 'String'>
    readonly essayAnswer: FieldRef<"StudentAnswer", 'String'>
    readonly isCorrect: FieldRef<"StudentAnswer", 'Boolean'>
    readonly pointsAwarded: FieldRef<"StudentAnswer", 'Float'>
    readonly teacherFeedback: FieldRef<"StudentAnswer", 'String'>
    readonly createdAt: FieldRef<"StudentAnswer", 'DateTime'>
    readonly updatedAt: FieldRef<"StudentAnswer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudentAnswer findUnique
   */
  export type StudentAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter, which StudentAnswer to fetch.
     */
    where: StudentAnswerWhereUniqueInput
  }

  /**
   * StudentAnswer findUniqueOrThrow
   */
  export type StudentAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter, which StudentAnswer to fetch.
     */
    where: StudentAnswerWhereUniqueInput
  }

  /**
   * StudentAnswer findFirst
   */
  export type StudentAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter, which StudentAnswer to fetch.
     */
    where?: StudentAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAnswers to fetch.
     */
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentAnswers.
     */
    cursor?: StudentAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentAnswers.
     */
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * StudentAnswer findFirstOrThrow
   */
  export type StudentAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter, which StudentAnswer to fetch.
     */
    where?: StudentAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAnswers to fetch.
     */
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentAnswers.
     */
    cursor?: StudentAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentAnswers.
     */
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * StudentAnswer findMany
   */
  export type StudentAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter, which StudentAnswers to fetch.
     */
    where?: StudentAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAnswers to fetch.
     */
    orderBy?: StudentAnswerOrderByWithRelationInput | StudentAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentAnswers.
     */
    cursor?: StudentAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAnswers.
     */
    skip?: number
    distinct?: StudentAnswerScalarFieldEnum | StudentAnswerScalarFieldEnum[]
  }

  /**
   * StudentAnswer create
   */
  export type StudentAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentAnswer.
     */
    data: XOR<StudentAnswerCreateInput, StudentAnswerUncheckedCreateInput>
  }

  /**
   * StudentAnswer createMany
   */
  export type StudentAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentAnswers.
     */
    data: StudentAnswerCreateManyInput | StudentAnswerCreateManyInput[]
  }

  /**
   * StudentAnswer createManyAndReturn
   */
  export type StudentAnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StudentAnswers.
     */
    data: StudentAnswerCreateManyInput | StudentAnswerCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentAnswer update
   */
  export type StudentAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentAnswer.
     */
    data: XOR<StudentAnswerUpdateInput, StudentAnswerUncheckedUpdateInput>
    /**
     * Choose, which StudentAnswer to update.
     */
    where: StudentAnswerWhereUniqueInput
  }

  /**
   * StudentAnswer updateMany
   */
  export type StudentAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentAnswers.
     */
    data: XOR<StudentAnswerUpdateManyMutationInput, StudentAnswerUncheckedUpdateManyInput>
    /**
     * Filter which StudentAnswers to update
     */
    where?: StudentAnswerWhereInput
  }

  /**
   * StudentAnswer upsert
   */
  export type StudentAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentAnswer to update in case it exists.
     */
    where: StudentAnswerWhereUniqueInput
    /**
     * In case the StudentAnswer found by the `where` argument doesn't exist, create a new StudentAnswer with this data.
     */
    create: XOR<StudentAnswerCreateInput, StudentAnswerUncheckedCreateInput>
    /**
     * In case the StudentAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentAnswerUpdateInput, StudentAnswerUncheckedUpdateInput>
  }

  /**
   * StudentAnswer delete
   */
  export type StudentAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
    /**
     * Filter which StudentAnswer to delete.
     */
    where: StudentAnswerWhereUniqueInput
  }

  /**
   * StudentAnswer deleteMany
   */
  export type StudentAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentAnswers to delete
     */
    where?: StudentAnswerWhereInput
  }

  /**
   * StudentAnswer without action
   */
  export type StudentAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAnswer
     */
    select?: StudentAnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAnswerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AcademicStageScalarFieldEnum: {
    id: 'id',
    teacherId: 'teacherId',
    name: 'name',
    orderIndex: 'orderIndex',
    createdAt: 'createdAt'
  };

  export type AcademicStageScalarFieldEnum = (typeof AcademicStageScalarFieldEnum)[keyof typeof AcademicStageScalarFieldEnum]


  export const StudentScalarFieldEnum: {
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

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    title: 'title',
    message: 'message',
    type: 'type',
    link: 'link',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const CourseScalarFieldEnum: {
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

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    teacherId: 'teacherId',
    name: 'name',
    stage: 'stage',
    createdAt: 'createdAt'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const ExamScalarFieldEnum: {
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

  export type ExamScalarFieldEnum = (typeof ExamScalarFieldEnum)[keyof typeof ExamScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
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

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const QuestionOptionScalarFieldEnum: {
    id: 'id',
    questionId: 'questionId',
    optionKey: 'optionKey',
    text: 'text'
  };

  export type QuestionOptionScalarFieldEnum = (typeof QuestionOptionScalarFieldEnum)[keyof typeof QuestionOptionScalarFieldEnum]


  export const ExamAttemptScalarFieldEnum: {
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

  export type ExamAttemptScalarFieldEnum = (typeof ExamAttemptScalarFieldEnum)[keyof typeof ExamAttemptScalarFieldEnum]


  export const StudentAnswerScalarFieldEnum: {
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

  export type StudentAnswerScalarFieldEnum = (typeof StudentAnswerScalarFieldEnum)[keyof typeof StudentAnswerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    geminiApiKey?: StringNullableFilter<"User"> | string | null
    geminiModel?: StringFilter<"User"> | string
    platformName?: StringFilter<"User"> | string
    teacherTitle?: StringFilter<"User"> | string
    teacherBio?: StringFilter<"User"> | string
    teacherExperience?: StringFilter<"User"> | string
    teacherStudentsCount?: StringFilter<"User"> | string
    teacherCoursesCount?: StringFilter<"User"> | string
    heroBadge?: StringFilter<"User"> | string
    heroTitle?: StringFilter<"User"> | string
    heroSubtitle?: StringFilter<"User"> | string
    teacherImageUrl?: StringFilter<"User"> | string
    brandTheme?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    exams?: ExamListRelationFilter
    groups?: GroupListRelationFilter
    courses?: CourseListRelationFilter
    stages?: AcademicStageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    geminiApiKey?: SortOrderInput | SortOrder
    geminiModel?: SortOrder
    platformName?: SortOrder
    teacherTitle?: SortOrder
    teacherBio?: SortOrder
    teacherExperience?: SortOrder
    teacherStudentsCount?: SortOrder
    teacherCoursesCount?: SortOrder
    heroBadge?: SortOrder
    heroTitle?: SortOrder
    heroSubtitle?: SortOrder
    teacherImageUrl?: SortOrder
    brandTheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    exams?: ExamOrderByRelationAggregateInput
    groups?: GroupOrderByRelationAggregateInput
    courses?: CourseOrderByRelationAggregateInput
    stages?: AcademicStageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    geminiApiKey?: StringNullableFilter<"User"> | string | null
    geminiModel?: StringFilter<"User"> | string
    platformName?: StringFilter<"User"> | string
    teacherTitle?: StringFilter<"User"> | string
    teacherBio?: StringFilter<"User"> | string
    teacherExperience?: StringFilter<"User"> | string
    teacherStudentsCount?: StringFilter<"User"> | string
    teacherCoursesCount?: StringFilter<"User"> | string
    heroBadge?: StringFilter<"User"> | string
    heroTitle?: StringFilter<"User"> | string
    heroSubtitle?: StringFilter<"User"> | string
    teacherImageUrl?: StringFilter<"User"> | string
    brandTheme?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    exams?: ExamListRelationFilter
    groups?: GroupListRelationFilter
    courses?: CourseListRelationFilter
    stages?: AcademicStageListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    geminiApiKey?: SortOrderInput | SortOrder
    geminiModel?: SortOrder
    platformName?: SortOrder
    teacherTitle?: SortOrder
    teacherBio?: SortOrder
    teacherExperience?: SortOrder
    teacherStudentsCount?: SortOrder
    teacherCoursesCount?: SortOrder
    heroBadge?: SortOrder
    heroTitle?: SortOrder
    heroSubtitle?: SortOrder
    teacherImageUrl?: SortOrder
    brandTheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    geminiApiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    geminiModel?: StringWithAggregatesFilter<"User"> | string
    platformName?: StringWithAggregatesFilter<"User"> | string
    teacherTitle?: StringWithAggregatesFilter<"User"> | string
    teacherBio?: StringWithAggregatesFilter<"User"> | string
    teacherExperience?: StringWithAggregatesFilter<"User"> | string
    teacherStudentsCount?: StringWithAggregatesFilter<"User"> | string
    teacherCoursesCount?: StringWithAggregatesFilter<"User"> | string
    heroBadge?: StringWithAggregatesFilter<"User"> | string
    heroTitle?: StringWithAggregatesFilter<"User"> | string
    heroSubtitle?: StringWithAggregatesFilter<"User"> | string
    teacherImageUrl?: StringWithAggregatesFilter<"User"> | string
    brandTheme?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AcademicStageWhereInput = {
    AND?: AcademicStageWhereInput | AcademicStageWhereInput[]
    OR?: AcademicStageWhereInput[]
    NOT?: AcademicStageWhereInput | AcademicStageWhereInput[]
    id?: StringFilter<"AcademicStage"> | string
    teacherId?: StringNullableFilter<"AcademicStage"> | string | null
    name?: StringFilter<"AcademicStage"> | string
    orderIndex?: IntFilter<"AcademicStage"> | number
    createdAt?: DateTimeFilter<"AcademicStage"> | Date | string
    teacher?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type AcademicStageOrderByWithRelationInput = {
    id?: SortOrder
    teacherId?: SortOrderInput | SortOrder
    name?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    teacher?: UserOrderByWithRelationInput
  }

  export type AcademicStageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: AcademicStageWhereInput | AcademicStageWhereInput[]
    OR?: AcademicStageWhereInput[]
    NOT?: AcademicStageWhereInput | AcademicStageWhereInput[]
    teacherId?: StringNullableFilter<"AcademicStage"> | string | null
    orderIndex?: IntFilter<"AcademicStage"> | number
    createdAt?: DateTimeFilter<"AcademicStage"> | Date | string
    teacher?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id" | "name">

  export type AcademicStageOrderByWithAggregationInput = {
    id?: SortOrder
    teacherId?: SortOrderInput | SortOrder
    name?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    _count?: AcademicStageCountOrderByAggregateInput
    _avg?: AcademicStageAvgOrderByAggregateInput
    _max?: AcademicStageMaxOrderByAggregateInput
    _min?: AcademicStageMinOrderByAggregateInput
    _sum?: AcademicStageSumOrderByAggregateInput
  }

  export type AcademicStageScalarWhereWithAggregatesInput = {
    AND?: AcademicStageScalarWhereWithAggregatesInput | AcademicStageScalarWhereWithAggregatesInput[]
    OR?: AcademicStageScalarWhereWithAggregatesInput[]
    NOT?: AcademicStageScalarWhereWithAggregatesInput | AcademicStageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcademicStage"> | string
    teacherId?: StringNullableWithAggregatesFilter<"AcademicStage"> | string | null
    name?: StringWithAggregatesFilter<"AcademicStage"> | string
    orderIndex?: IntWithAggregatesFilter<"AcademicStage"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AcademicStage"> | Date | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    username?: StringFilter<"Student"> | string
    email?: StringNullableFilter<"Student"> | string | null
    passwordHash?: StringFilter<"Student"> | string
    phone?: StringFilter<"Student"> | string
    parentPhone?: StringFilter<"Student"> | string
    stage?: StringFilter<"Student"> | string
    groupName?: StringFilter<"Student"> | string
    semester?: StringFilter<"Student"> | string
    isActive?: BoolFilter<"Student"> | boolean
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    attempts?: ExamAttemptListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    parentPhone?: SortOrder
    stage?: SortOrder
    groupName?: SortOrder
    semester?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attempts?: ExamAttemptOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    phone?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    passwordHash?: StringFilter<"Student"> | string
    parentPhone?: StringFilter<"Student"> | string
    stage?: StringFilter<"Student"> | string
    groupName?: StringFilter<"Student"> | string
    semester?: StringFilter<"Student"> | string
    isActive?: BoolFilter<"Student"> | boolean
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    attempts?: ExamAttemptListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "username" | "email" | "phone">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    parentPhone?: SortOrder
    stage?: SortOrder
    groupName?: SortOrder
    semester?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Student"> | string
    name?: StringWithAggregatesFilter<"Student"> | string
    username?: StringWithAggregatesFilter<"Student"> | string
    email?: StringNullableWithAggregatesFilter<"Student"> | string | null
    passwordHash?: StringWithAggregatesFilter<"Student"> | string
    phone?: StringWithAggregatesFilter<"Student"> | string
    parentPhone?: StringWithAggregatesFilter<"Student"> | string
    stage?: StringWithAggregatesFilter<"Student"> | string
    groupName?: StringWithAggregatesFilter<"Student"> | string
    semester?: StringWithAggregatesFilter<"Student"> | string
    isActive?: BoolWithAggregatesFilter<"Student"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    studentId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrderInput | SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    studentId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrderInput | SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    studentId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    link?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    teacherId?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    stage?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    badge?: StringFilter<"Course"> | string
    lessonsCount?: IntFilter<"Course"> | number
    duration?: StringFilter<"Course"> | string
    price?: StringNullableFilter<"Course"> | string | null
    themeColor?: StringFilter<"Course"> | string
    isPublished?: BoolFilter<"Course"> | boolean
    orderIndex?: IntFilter<"Course"> | number
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    teacher?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    title?: SortOrder
    stage?: SortOrder
    description?: SortOrder
    badge?: SortOrder
    lessonsCount?: SortOrder
    duration?: SortOrder
    price?: SortOrderInput | SortOrder
    themeColor?: SortOrder
    isPublished?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teacher?: UserOrderByWithRelationInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    teacherId?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    stage?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    badge?: StringFilter<"Course"> | string
    lessonsCount?: IntFilter<"Course"> | number
    duration?: StringFilter<"Course"> | string
    price?: StringNullableFilter<"Course"> | string | null
    themeColor?: StringFilter<"Course"> | string
    isPublished?: BoolFilter<"Course"> | boolean
    orderIndex?: IntFilter<"Course"> | number
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    teacher?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    title?: SortOrder
    stage?: SortOrder
    description?: SortOrder
    badge?: SortOrder
    lessonsCount?: SortOrder
    duration?: SortOrder
    price?: SortOrderInput | SortOrder
    themeColor?: SortOrder
    isPublished?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    teacherId?: StringWithAggregatesFilter<"Course"> | string
    title?: StringWithAggregatesFilter<"Course"> | string
    stage?: StringWithAggregatesFilter<"Course"> | string
    description?: StringWithAggregatesFilter<"Course"> | string
    badge?: StringWithAggregatesFilter<"Course"> | string
    lessonsCount?: IntWithAggregatesFilter<"Course"> | number
    duration?: StringWithAggregatesFilter<"Course"> | string
    price?: StringNullableWithAggregatesFilter<"Course"> | string | null
    themeColor?: StringWithAggregatesFilter<"Course"> | string
    isPublished?: BoolWithAggregatesFilter<"Course"> | boolean
    orderIndex?: IntWithAggregatesFilter<"Course"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: StringFilter<"Group"> | string
    teacherId?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    stage?: StringNullableFilter<"Group"> | string | null
    createdAt?: DateTimeFilter<"Group"> | Date | string
    teacher?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    name?: SortOrder
    stage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    teacher?: UserOrderByWithRelationInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    teacherId?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    stage?: StringNullableFilter<"Group"> | string | null
    createdAt?: DateTimeFilter<"Group"> | Date | string
    teacher?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    name?: SortOrder
    stage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Group"> | string
    teacherId?: StringWithAggregatesFilter<"Group"> | string
    name?: StringWithAggregatesFilter<"Group"> | string
    stage?: StringNullableWithAggregatesFilter<"Group"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
  }

  export type ExamWhereInput = {
    AND?: ExamWhereInput | ExamWhereInput[]
    OR?: ExamWhereInput[]
    NOT?: ExamWhereInput | ExamWhereInput[]
    id?: StringFilter<"Exam"> | string
    teacherId?: StringFilter<"Exam"> | string
    code?: StringFilter<"Exam"> | string
    title?: StringFilter<"Exam"> | string
    description?: StringNullableFilter<"Exam"> | string | null
    durationMinutes?: IntNullableFilter<"Exam"> | number | null
    status?: StringFilter<"Exam"> | string
    allowMultipleAttempts?: BoolFilter<"Exam"> | boolean
    maxAttempts?: IntFilter<"Exam"> | number
    targetStage?: StringNullableFilter<"Exam"> | string | null
    targetGroup?: StringNullableFilter<"Exam"> | string | null
    targetSemester?: StringNullableFilter<"Exam"> | string | null
    startsAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    endsAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    examType?: StringFilter<"Exam"> | string
    showResultsDirectly?: BoolFilter<"Exam"> | boolean
    requirePhone?: BoolFilter<"Exam"> | boolean
    requireGroup?: BoolFilter<"Exam"> | boolean
    groupsList?: StringFilter<"Exam"> | string
    totalPoints?: FloatFilter<"Exam"> | number
    passingPercentage?: FloatFilter<"Exam"> | number
    createdAt?: DateTimeFilter<"Exam"> | Date | string
    updatedAt?: DateTimeFilter<"Exam"> | Date | string
    teacher?: XOR<UserRelationFilter, UserWhereInput>
    questions?: QuestionListRelationFilter
    attempts?: ExamAttemptListRelationFilter
  }

  export type ExamOrderByWithRelationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    durationMinutes?: SortOrderInput | SortOrder
    status?: SortOrder
    allowMultipleAttempts?: SortOrder
    maxAttempts?: SortOrder
    targetStage?: SortOrderInput | SortOrder
    targetGroup?: SortOrderInput | SortOrder
    targetSemester?: SortOrderInput | SortOrder
    startsAt?: SortOrderInput | SortOrder
    endsAt?: SortOrderInput | SortOrder
    examType?: SortOrder
    showResultsDirectly?: SortOrder
    requirePhone?: SortOrder
    requireGroup?: SortOrder
    groupsList?: SortOrder
    totalPoints?: SortOrder
    passingPercentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teacher?: UserOrderByWithRelationInput
    questions?: QuestionOrderByRelationAggregateInput
    attempts?: ExamAttemptOrderByRelationAggregateInput
  }

  export type ExamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: ExamWhereInput | ExamWhereInput[]
    OR?: ExamWhereInput[]
    NOT?: ExamWhereInput | ExamWhereInput[]
    teacherId?: StringFilter<"Exam"> | string
    title?: StringFilter<"Exam"> | string
    description?: StringNullableFilter<"Exam"> | string | null
    durationMinutes?: IntNullableFilter<"Exam"> | number | null
    status?: StringFilter<"Exam"> | string
    allowMultipleAttempts?: BoolFilter<"Exam"> | boolean
    maxAttempts?: IntFilter<"Exam"> | number
    targetStage?: StringNullableFilter<"Exam"> | string | null
    targetGroup?: StringNullableFilter<"Exam"> | string | null
    targetSemester?: StringNullableFilter<"Exam"> | string | null
    startsAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    endsAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    examType?: StringFilter<"Exam"> | string
    showResultsDirectly?: BoolFilter<"Exam"> | boolean
    requirePhone?: BoolFilter<"Exam"> | boolean
    requireGroup?: BoolFilter<"Exam"> | boolean
    groupsList?: StringFilter<"Exam"> | string
    totalPoints?: FloatFilter<"Exam"> | number
    passingPercentage?: FloatFilter<"Exam"> | number
    createdAt?: DateTimeFilter<"Exam"> | Date | string
    updatedAt?: DateTimeFilter<"Exam"> | Date | string
    teacher?: XOR<UserRelationFilter, UserWhereInput>
    questions?: QuestionListRelationFilter
    attempts?: ExamAttemptListRelationFilter
  }, "id" | "code">

  export type ExamOrderByWithAggregationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    durationMinutes?: SortOrderInput | SortOrder
    status?: SortOrder
    allowMultipleAttempts?: SortOrder
    maxAttempts?: SortOrder
    targetStage?: SortOrderInput | SortOrder
    targetGroup?: SortOrderInput | SortOrder
    targetSemester?: SortOrderInput | SortOrder
    startsAt?: SortOrderInput | SortOrder
    endsAt?: SortOrderInput | SortOrder
    examType?: SortOrder
    showResultsDirectly?: SortOrder
    requirePhone?: SortOrder
    requireGroup?: SortOrder
    groupsList?: SortOrder
    totalPoints?: SortOrder
    passingPercentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExamCountOrderByAggregateInput
    _avg?: ExamAvgOrderByAggregateInput
    _max?: ExamMaxOrderByAggregateInput
    _min?: ExamMinOrderByAggregateInput
    _sum?: ExamSumOrderByAggregateInput
  }

  export type ExamScalarWhereWithAggregatesInput = {
    AND?: ExamScalarWhereWithAggregatesInput | ExamScalarWhereWithAggregatesInput[]
    OR?: ExamScalarWhereWithAggregatesInput[]
    NOT?: ExamScalarWhereWithAggregatesInput | ExamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exam"> | string
    teacherId?: StringWithAggregatesFilter<"Exam"> | string
    code?: StringWithAggregatesFilter<"Exam"> | string
    title?: StringWithAggregatesFilter<"Exam"> | string
    description?: StringNullableWithAggregatesFilter<"Exam"> | string | null
    durationMinutes?: IntNullableWithAggregatesFilter<"Exam"> | number | null
    status?: StringWithAggregatesFilter<"Exam"> | string
    allowMultipleAttempts?: BoolWithAggregatesFilter<"Exam"> | boolean
    maxAttempts?: IntWithAggregatesFilter<"Exam"> | number
    targetStage?: StringNullableWithAggregatesFilter<"Exam"> | string | null
    targetGroup?: StringNullableWithAggregatesFilter<"Exam"> | string | null
    targetSemester?: StringNullableWithAggregatesFilter<"Exam"> | string | null
    startsAt?: DateTimeNullableWithAggregatesFilter<"Exam"> | Date | string | null
    endsAt?: DateTimeNullableWithAggregatesFilter<"Exam"> | Date | string | null
    examType?: StringWithAggregatesFilter<"Exam"> | string
    showResultsDirectly?: BoolWithAggregatesFilter<"Exam"> | boolean
    requirePhone?: BoolWithAggregatesFilter<"Exam"> | boolean
    requireGroup?: BoolWithAggregatesFilter<"Exam"> | boolean
    groupsList?: StringWithAggregatesFilter<"Exam"> | string
    totalPoints?: FloatWithAggregatesFilter<"Exam"> | number
    passingPercentage?: FloatWithAggregatesFilter<"Exam"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Exam"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Exam"> | Date | string
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: StringFilter<"Question"> | string
    examId?: StringFilter<"Question"> | string
    questionNumber?: IntFilter<"Question"> | number
    type?: StringFilter<"Question"> | string
    questionText?: StringFilter<"Question"> | string
    points?: FloatFilter<"Question"> | number
    correctOptionId?: StringNullableFilter<"Question"> | string | null
    needsReview?: BoolFilter<"Question"> | boolean
    orderIndex?: IntFilter<"Question"> | number
    exam?: XOR<ExamRelationFilter, ExamWhereInput>
    options?: QuestionOptionListRelationFilter
    answers?: StudentAnswerListRelationFilter
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    examId?: SortOrder
    questionNumber?: SortOrder
    type?: SortOrder
    questionText?: SortOrder
    points?: SortOrder
    correctOptionId?: SortOrderInput | SortOrder
    needsReview?: SortOrder
    orderIndex?: SortOrder
    exam?: ExamOrderByWithRelationInput
    options?: QuestionOptionOrderByRelationAggregateInput
    answers?: StudentAnswerOrderByRelationAggregateInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    examId?: StringFilter<"Question"> | string
    questionNumber?: IntFilter<"Question"> | number
    type?: StringFilter<"Question"> | string
    questionText?: StringFilter<"Question"> | string
    points?: FloatFilter<"Question"> | number
    correctOptionId?: StringNullableFilter<"Question"> | string | null
    needsReview?: BoolFilter<"Question"> | boolean
    orderIndex?: IntFilter<"Question"> | number
    exam?: XOR<ExamRelationFilter, ExamWhereInput>
    options?: QuestionOptionListRelationFilter
    answers?: StudentAnswerListRelationFilter
  }, "id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    examId?: SortOrder
    questionNumber?: SortOrder
    type?: SortOrder
    questionText?: SortOrder
    points?: SortOrder
    correctOptionId?: SortOrderInput | SortOrder
    needsReview?: SortOrder
    orderIndex?: SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _avg?: QuestionAvgOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
    _sum?: QuestionSumOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question"> | string
    examId?: StringWithAggregatesFilter<"Question"> | string
    questionNumber?: IntWithAggregatesFilter<"Question"> | number
    type?: StringWithAggregatesFilter<"Question"> | string
    questionText?: StringWithAggregatesFilter<"Question"> | string
    points?: FloatWithAggregatesFilter<"Question"> | number
    correctOptionId?: StringNullableWithAggregatesFilter<"Question"> | string | null
    needsReview?: BoolWithAggregatesFilter<"Question"> | boolean
    orderIndex?: IntWithAggregatesFilter<"Question"> | number
  }

  export type QuestionOptionWhereInput = {
    AND?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    OR?: QuestionOptionWhereInput[]
    NOT?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    id?: StringFilter<"QuestionOption"> | string
    questionId?: StringFilter<"QuestionOption"> | string
    optionKey?: StringFilter<"QuestionOption"> | string
    text?: StringFilter<"QuestionOption"> | string
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
  }

  export type QuestionOptionOrderByWithRelationInput = {
    id?: SortOrder
    questionId?: SortOrder
    optionKey?: SortOrder
    text?: SortOrder
    question?: QuestionOrderByWithRelationInput
  }

  export type QuestionOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    OR?: QuestionOptionWhereInput[]
    NOT?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    questionId?: StringFilter<"QuestionOption"> | string
    optionKey?: StringFilter<"QuestionOption"> | string
    text?: StringFilter<"QuestionOption"> | string
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
  }, "id">

  export type QuestionOptionOrderByWithAggregationInput = {
    id?: SortOrder
    questionId?: SortOrder
    optionKey?: SortOrder
    text?: SortOrder
    _count?: QuestionOptionCountOrderByAggregateInput
    _max?: QuestionOptionMaxOrderByAggregateInput
    _min?: QuestionOptionMinOrderByAggregateInput
  }

  export type QuestionOptionScalarWhereWithAggregatesInput = {
    AND?: QuestionOptionScalarWhereWithAggregatesInput | QuestionOptionScalarWhereWithAggregatesInput[]
    OR?: QuestionOptionScalarWhereWithAggregatesInput[]
    NOT?: QuestionOptionScalarWhereWithAggregatesInput | QuestionOptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuestionOption"> | string
    questionId?: StringWithAggregatesFilter<"QuestionOption"> | string
    optionKey?: StringWithAggregatesFilter<"QuestionOption"> | string
    text?: StringWithAggregatesFilter<"QuestionOption"> | string
  }

  export type ExamAttemptWhereInput = {
    AND?: ExamAttemptWhereInput | ExamAttemptWhereInput[]
    OR?: ExamAttemptWhereInput[]
    NOT?: ExamAttemptWhereInput | ExamAttemptWhereInput[]
    id?: StringFilter<"ExamAttempt"> | string
    examId?: StringFilter<"ExamAttempt"> | string
    studentId?: StringNullableFilter<"ExamAttempt"> | string | null
    studentName?: StringFilter<"ExamAttempt"> | string
    studentPhone?: StringFilter<"ExamAttempt"> | string
    studentGroup?: StringNullableFilter<"ExamAttempt"> | string | null
    extraData?: StringNullableFilter<"ExamAttempt"> | string | null
    startedAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    submittedAt?: DateTimeNullableFilter<"ExamAttempt"> | Date | string | null
    timeSpentSeconds?: IntFilter<"ExamAttempt"> | number
    status?: StringFilter<"ExamAttempt"> | string
    isApproved?: BoolFilter<"ExamAttempt"> | boolean
    approvedAt?: DateTimeNullableFilter<"ExamAttempt"> | Date | string | null
    approvedBy?: StringNullableFilter<"ExamAttempt"> | string | null
    teacherNotes?: StringNullableFilter<"ExamAttempt"> | string | null
    mcqScore?: FloatFilter<"ExamAttempt"> | number
    essayScore?: FloatFilter<"ExamAttempt"> | number
    totalScore?: FloatFilter<"ExamAttempt"> | number
    maxScore?: FloatFilter<"ExamAttempt"> | number
    percentage?: FloatFilter<"ExamAttempt"> | number
    isPassed?: BoolFilter<"ExamAttempt"> | boolean
    createdAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    exam?: XOR<ExamRelationFilter, ExamWhereInput>
    student?: XOR<StudentNullableRelationFilter, StudentWhereInput> | null
    answers?: StudentAnswerListRelationFilter
  }

  export type ExamAttemptOrderByWithRelationInput = {
    id?: SortOrder
    examId?: SortOrder
    studentId?: SortOrderInput | SortOrder
    studentName?: SortOrder
    studentPhone?: SortOrder
    studentGroup?: SortOrderInput | SortOrder
    extraData?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    timeSpentSeconds?: SortOrder
    status?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    teacherNotes?: SortOrderInput | SortOrder
    mcqScore?: SortOrder
    essayScore?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
    isPassed?: SortOrder
    createdAt?: SortOrder
    exam?: ExamOrderByWithRelationInput
    student?: StudentOrderByWithRelationInput
    answers?: StudentAnswerOrderByRelationAggregateInput
  }

  export type ExamAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExamAttemptWhereInput | ExamAttemptWhereInput[]
    OR?: ExamAttemptWhereInput[]
    NOT?: ExamAttemptWhereInput | ExamAttemptWhereInput[]
    examId?: StringFilter<"ExamAttempt"> | string
    studentId?: StringNullableFilter<"ExamAttempt"> | string | null
    studentName?: StringFilter<"ExamAttempt"> | string
    studentPhone?: StringFilter<"ExamAttempt"> | string
    studentGroup?: StringNullableFilter<"ExamAttempt"> | string | null
    extraData?: StringNullableFilter<"ExamAttempt"> | string | null
    startedAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    submittedAt?: DateTimeNullableFilter<"ExamAttempt"> | Date | string | null
    timeSpentSeconds?: IntFilter<"ExamAttempt"> | number
    status?: StringFilter<"ExamAttempt"> | string
    isApproved?: BoolFilter<"ExamAttempt"> | boolean
    approvedAt?: DateTimeNullableFilter<"ExamAttempt"> | Date | string | null
    approvedBy?: StringNullableFilter<"ExamAttempt"> | string | null
    teacherNotes?: StringNullableFilter<"ExamAttempt"> | string | null
    mcqScore?: FloatFilter<"ExamAttempt"> | number
    essayScore?: FloatFilter<"ExamAttempt"> | number
    totalScore?: FloatFilter<"ExamAttempt"> | number
    maxScore?: FloatFilter<"ExamAttempt"> | number
    percentage?: FloatFilter<"ExamAttempt"> | number
    isPassed?: BoolFilter<"ExamAttempt"> | boolean
    createdAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    exam?: XOR<ExamRelationFilter, ExamWhereInput>
    student?: XOR<StudentNullableRelationFilter, StudentWhereInput> | null
    answers?: StudentAnswerListRelationFilter
  }, "id">

  export type ExamAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    examId?: SortOrder
    studentId?: SortOrderInput | SortOrder
    studentName?: SortOrder
    studentPhone?: SortOrder
    studentGroup?: SortOrderInput | SortOrder
    extraData?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    timeSpentSeconds?: SortOrder
    status?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    teacherNotes?: SortOrderInput | SortOrder
    mcqScore?: SortOrder
    essayScore?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
    isPassed?: SortOrder
    createdAt?: SortOrder
    _count?: ExamAttemptCountOrderByAggregateInput
    _avg?: ExamAttemptAvgOrderByAggregateInput
    _max?: ExamAttemptMaxOrderByAggregateInput
    _min?: ExamAttemptMinOrderByAggregateInput
    _sum?: ExamAttemptSumOrderByAggregateInput
  }

  export type ExamAttemptScalarWhereWithAggregatesInput = {
    AND?: ExamAttemptScalarWhereWithAggregatesInput | ExamAttemptScalarWhereWithAggregatesInput[]
    OR?: ExamAttemptScalarWhereWithAggregatesInput[]
    NOT?: ExamAttemptScalarWhereWithAggregatesInput | ExamAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExamAttempt"> | string
    examId?: StringWithAggregatesFilter<"ExamAttempt"> | string
    studentId?: StringNullableWithAggregatesFilter<"ExamAttempt"> | string | null
    studentName?: StringWithAggregatesFilter<"ExamAttempt"> | string
    studentPhone?: StringWithAggregatesFilter<"ExamAttempt"> | string
    studentGroup?: StringNullableWithAggregatesFilter<"ExamAttempt"> | string | null
    extraData?: StringNullableWithAggregatesFilter<"ExamAttempt"> | string | null
    startedAt?: DateTimeWithAggregatesFilter<"ExamAttempt"> | Date | string
    submittedAt?: DateTimeNullableWithAggregatesFilter<"ExamAttempt"> | Date | string | null
    timeSpentSeconds?: IntWithAggregatesFilter<"ExamAttempt"> | number
    status?: StringWithAggregatesFilter<"ExamAttempt"> | string
    isApproved?: BoolWithAggregatesFilter<"ExamAttempt"> | boolean
    approvedAt?: DateTimeNullableWithAggregatesFilter<"ExamAttempt"> | Date | string | null
    approvedBy?: StringNullableWithAggregatesFilter<"ExamAttempt"> | string | null
    teacherNotes?: StringNullableWithAggregatesFilter<"ExamAttempt"> | string | null
    mcqScore?: FloatWithAggregatesFilter<"ExamAttempt"> | number
    essayScore?: FloatWithAggregatesFilter<"ExamAttempt"> | number
    totalScore?: FloatWithAggregatesFilter<"ExamAttempt"> | number
    maxScore?: FloatWithAggregatesFilter<"ExamAttempt"> | number
    percentage?: FloatWithAggregatesFilter<"ExamAttempt"> | number
    isPassed?: BoolWithAggregatesFilter<"ExamAttempt"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ExamAttempt"> | Date | string
  }

  export type StudentAnswerWhereInput = {
    AND?: StudentAnswerWhereInput | StudentAnswerWhereInput[]
    OR?: StudentAnswerWhereInput[]
    NOT?: StudentAnswerWhereInput | StudentAnswerWhereInput[]
    id?: StringFilter<"StudentAnswer"> | string
    attemptId?: StringFilter<"StudentAnswer"> | string
    questionId?: StringFilter<"StudentAnswer"> | string
    selectedOption?: StringNullableFilter<"StudentAnswer"> | string | null
    essayAnswer?: StringNullableFilter<"StudentAnswer"> | string | null
    isCorrect?: BoolNullableFilter<"StudentAnswer"> | boolean | null
    pointsAwarded?: FloatFilter<"StudentAnswer"> | number
    teacherFeedback?: StringNullableFilter<"StudentAnswer"> | string | null
    createdAt?: DateTimeFilter<"StudentAnswer"> | Date | string
    updatedAt?: DateTimeFilter<"StudentAnswer"> | Date | string
    attempt?: XOR<ExamAttemptRelationFilter, ExamAttemptWhereInput>
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
  }

  export type StudentAnswerOrderByWithRelationInput = {
    id?: SortOrder
    attemptId?: SortOrder
    questionId?: SortOrder
    selectedOption?: SortOrderInput | SortOrder
    essayAnswer?: SortOrderInput | SortOrder
    isCorrect?: SortOrderInput | SortOrder
    pointsAwarded?: SortOrder
    teacherFeedback?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attempt?: ExamAttemptOrderByWithRelationInput
    question?: QuestionOrderByWithRelationInput
  }

  export type StudentAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StudentAnswerWhereInput | StudentAnswerWhereInput[]
    OR?: StudentAnswerWhereInput[]
    NOT?: StudentAnswerWhereInput | StudentAnswerWhereInput[]
    attemptId?: StringFilter<"StudentAnswer"> | string
    questionId?: StringFilter<"StudentAnswer"> | string
    selectedOption?: StringNullableFilter<"StudentAnswer"> | string | null
    essayAnswer?: StringNullableFilter<"StudentAnswer"> | string | null
    isCorrect?: BoolNullableFilter<"StudentAnswer"> | boolean | null
    pointsAwarded?: FloatFilter<"StudentAnswer"> | number
    teacherFeedback?: StringNullableFilter<"StudentAnswer"> | string | null
    createdAt?: DateTimeFilter<"StudentAnswer"> | Date | string
    updatedAt?: DateTimeFilter<"StudentAnswer"> | Date | string
    attempt?: XOR<ExamAttemptRelationFilter, ExamAttemptWhereInput>
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
  }, "id">

  export type StudentAnswerOrderByWithAggregationInput = {
    id?: SortOrder
    attemptId?: SortOrder
    questionId?: SortOrder
    selectedOption?: SortOrderInput | SortOrder
    essayAnswer?: SortOrderInput | SortOrder
    isCorrect?: SortOrderInput | SortOrder
    pointsAwarded?: SortOrder
    teacherFeedback?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentAnswerCountOrderByAggregateInput
    _avg?: StudentAnswerAvgOrderByAggregateInput
    _max?: StudentAnswerMaxOrderByAggregateInput
    _min?: StudentAnswerMinOrderByAggregateInput
    _sum?: StudentAnswerSumOrderByAggregateInput
  }

  export type StudentAnswerScalarWhereWithAggregatesInput = {
    AND?: StudentAnswerScalarWhereWithAggregatesInput | StudentAnswerScalarWhereWithAggregatesInput[]
    OR?: StudentAnswerScalarWhereWithAggregatesInput[]
    NOT?: StudentAnswerScalarWhereWithAggregatesInput | StudentAnswerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentAnswer"> | string
    attemptId?: StringWithAggregatesFilter<"StudentAnswer"> | string
    questionId?: StringWithAggregatesFilter<"StudentAnswer"> | string
    selectedOption?: StringNullableWithAggregatesFilter<"StudentAnswer"> | string | null
    essayAnswer?: StringNullableWithAggregatesFilter<"StudentAnswer"> | string | null
    isCorrect?: BoolNullableWithAggregatesFilter<"StudentAnswer"> | boolean | null
    pointsAwarded?: FloatWithAggregatesFilter<"StudentAnswer"> | number
    teacherFeedback?: StringNullableWithAggregatesFilter<"StudentAnswer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StudentAnswer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StudentAnswer"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: ExamCreateNestedManyWithoutTeacherInput
    groups?: GroupCreateNestedManyWithoutTeacherInput
    courses?: CourseCreateNestedManyWithoutTeacherInput
    stages?: AcademicStageCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: ExamUncheckedCreateNestedManyWithoutTeacherInput
    groups?: GroupUncheckedCreateNestedManyWithoutTeacherInput
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    stages?: AcademicStageUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUpdateManyWithoutTeacherNestedInput
    groups?: GroupUpdateManyWithoutTeacherNestedInput
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    stages?: AcademicStageUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUncheckedUpdateManyWithoutTeacherNestedInput
    groups?: GroupUncheckedUpdateManyWithoutTeacherNestedInput
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    stages?: AcademicStageUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicStageCreateInput = {
    id?: string
    name: string
    orderIndex?: number
    createdAt?: Date | string
    teacher?: UserCreateNestedOneWithoutStagesInput
  }

  export type AcademicStageUncheckedCreateInput = {
    id?: string
    teacherId?: string | null
    name: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type AcademicStageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneWithoutStagesNestedInput
  }

  export type AcademicStageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicStageCreateManyInput = {
    id?: string
    teacherId?: string | null
    name: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type AcademicStageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicStageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateInput = {
    id?: string
    name: string
    username: string
    email?: string | null
    passwordHash: string
    phone: string
    parentPhone: string
    stage: string
    groupName: string
    semester?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    attempts?: ExamAttemptCreateNestedManyWithoutStudentInput
    notifications?: NotificationCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: string
    name: string
    username: string
    email?: string | null
    passwordHash: string
    phone: string
    parentPhone: string
    stage: string
    groupName: string
    semester?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    attempts?: ExamAttemptUncheckedCreateNestedManyWithoutStudentInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: ExamAttemptUpdateManyWithoutStudentNestedInput
    notifications?: NotificationUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: ExamAttemptUncheckedUpdateManyWithoutStudentNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: string
    name: string
    username: string
    email?: string | null
    passwordHash: string
    phone: string
    parentPhone: string
    stage: string
    groupName: string
    semester?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    studentId: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    studentId: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateInput = {
    id?: string
    title: string
    stage: string
    description: string
    badge?: string
    lessonsCount?: number
    duration?: string
    price?: string | null
    themeColor?: string
    isPublished?: boolean
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: UserCreateNestedOneWithoutCoursesInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    teacherId: string
    title: string
    stage: string
    description: string
    badge?: string
    lessonsCount?: number
    duration?: string
    price?: string | null
    themeColor?: string
    isPublished?: boolean
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    badge?: StringFieldUpdateOperationsInput | string
    lessonsCount?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    themeColor?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutCoursesNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    badge?: StringFieldUpdateOperationsInput | string
    lessonsCount?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    themeColor?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateManyInput = {
    id?: string
    teacherId: string
    title: string
    stage: string
    description: string
    badge?: string
    lessonsCount?: number
    duration?: string
    price?: string | null
    themeColor?: string
    isPublished?: boolean
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    badge?: StringFieldUpdateOperationsInput | string
    lessonsCount?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    themeColor?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    badge?: StringFieldUpdateOperationsInput | string
    lessonsCount?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    themeColor?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupCreateInput = {
    id?: string
    name: string
    stage?: string | null
    createdAt?: Date | string
    teacher: UserCreateNestedOneWithoutGroupsInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    teacherId: string
    name: string
    stage?: string | null
    createdAt?: Date | string
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutGroupsNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupCreateManyInput = {
    id?: string
    teacherId: string
    name: string
    stage?: string | null
    createdAt?: Date | string
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamCreateInput = {
    id?: string
    code: string
    title: string
    description?: string | null
    durationMinutes?: number | null
    status?: string
    allowMultipleAttempts?: boolean
    maxAttempts?: number
    targetStage?: string | null
    targetGroup?: string | null
    targetSemester?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    examType?: string
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: string
    totalPoints?: number
    passingPercentage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: UserCreateNestedOneWithoutExamsInput
    questions?: QuestionCreateNestedManyWithoutExamInput
    attempts?: ExamAttemptCreateNestedManyWithoutExamInput
  }

  export type ExamUncheckedCreateInput = {
    id?: string
    teacherId: string
    code: string
    title: string
    description?: string | null
    durationMinutes?: number | null
    status?: string
    allowMultipleAttempts?: boolean
    maxAttempts?: number
    targetStage?: string | null
    targetGroup?: string | null
    targetSemester?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    examType?: string
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: string
    totalPoints?: number
    passingPercentage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutExamInput
    attempts?: ExamAttemptUncheckedCreateNestedManyWithoutExamInput
  }

  export type ExamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutExamsNestedInput
    questions?: QuestionUpdateManyWithoutExamNestedInput
    attempts?: ExamAttemptUpdateManyWithoutExamNestedInput
  }

  export type ExamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutExamNestedInput
    attempts?: ExamAttemptUncheckedUpdateManyWithoutExamNestedInput
  }

  export type ExamCreateManyInput = {
    id?: string
    teacherId: string
    code: string
    title: string
    description?: string | null
    durationMinutes?: number | null
    status?: string
    allowMultipleAttempts?: boolean
    maxAttempts?: number
    targetStage?: string | null
    targetGroup?: string | null
    targetSemester?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    examType?: string
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: string
    totalPoints?: number
    passingPercentage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateInput = {
    id?: string
    questionNumber: number
    type: string
    questionText: string
    points?: number
    correctOptionId?: string | null
    needsReview?: boolean
    orderIndex?: number
    exam: ExamCreateNestedOneWithoutQuestionsInput
    options?: QuestionOptionCreateNestedManyWithoutQuestionInput
    answers?: StudentAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: string
    examId: string
    questionNumber: number
    type: string
    questionText: string
    points?: number
    correctOptionId?: string | null
    needsReview?: boolean
    orderIndex?: number
    options?: QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput
    answers?: StudentAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    exam?: ExamUpdateOneRequiredWithoutQuestionsNestedInput
    options?: QuestionOptionUpdateManyWithoutQuestionNestedInput
    answers?: StudentAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    options?: QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput
    answers?: StudentAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionCreateManyInput = {
    id?: string
    examId: string
    questionNumber: number
    type: string
    questionText: string
    points?: number
    correctOptionId?: string | null
    needsReview?: boolean
    orderIndex?: number
  }

  export type QuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type QuestionOptionCreateInput = {
    id?: string
    optionKey: string
    text: string
    question: QuestionCreateNestedOneWithoutOptionsInput
  }

  export type QuestionOptionUncheckedCreateInput = {
    id?: string
    questionId: string
    optionKey: string
    text: string
  }

  export type QuestionOptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    optionKey?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    question?: QuestionUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type QuestionOptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionKey?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionOptionCreateManyInput = {
    id?: string
    questionId: string
    optionKey: string
    text: string
  }

  export type QuestionOptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    optionKey?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionOptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionKey?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type ExamAttemptCreateInput = {
    id?: string
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
    exam: ExamCreateNestedOneWithoutAttemptsInput
    student?: StudentCreateNestedOneWithoutAttemptsInput
    answers?: StudentAnswerCreateNestedManyWithoutAttemptInput
  }

  export type ExamAttemptUncheckedCreateInput = {
    id?: string
    examId: string
    studentId?: string | null
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
    answers?: StudentAnswerUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type ExamAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exam?: ExamUpdateOneRequiredWithoutAttemptsNestedInput
    student?: StudentUpdateOneWithoutAttemptsNestedInput
    answers?: StudentAnswerUpdateManyWithoutAttemptNestedInput
  }

  export type ExamAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: StudentAnswerUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type ExamAttemptCreateManyInput = {
    id?: string
    examId: string
    studentId?: string | null
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
  }

  export type ExamAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAnswerCreateInput = {
    id?: string
    selectedOption?: string | null
    essayAnswer?: string | null
    isCorrect?: boolean | null
    pointsAwarded?: number
    teacherFeedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attempt: ExamAttemptCreateNestedOneWithoutAnswersInput
    question: QuestionCreateNestedOneWithoutAnswersInput
  }

  export type StudentAnswerUncheckedCreateInput = {
    id?: string
    attemptId: string
    questionId: string
    selectedOption?: string | null
    essayAnswer?: string | null
    isCorrect?: boolean | null
    pointsAwarded?: number
    teacherFeedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentAnswerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectedOption?: NullableStringFieldUpdateOperationsInput | string | null
    essayAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isCorrect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    teacherFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempt?: ExamAttemptUpdateOneRequiredWithoutAnswersNestedInput
    question?: QuestionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type StudentAnswerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOption?: NullableStringFieldUpdateOperationsInput | string | null
    essayAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isCorrect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    teacherFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAnswerCreateManyInput = {
    id?: string
    attemptId: string
    questionId: string
    selectedOption?: string | null
    essayAnswer?: string | null
    isCorrect?: boolean | null
    pointsAwarded?: number
    teacherFeedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentAnswerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectedOption?: NullableStringFieldUpdateOperationsInput | string | null
    essayAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isCorrect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    teacherFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAnswerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOption?: NullableStringFieldUpdateOperationsInput | string | null
    essayAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isCorrect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    teacherFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ExamListRelationFilter = {
    every?: ExamWhereInput
    some?: ExamWhereInput
    none?: ExamWhereInput
  }

  export type GroupListRelationFilter = {
    every?: GroupWhereInput
    some?: GroupWhereInput
    none?: GroupWhereInput
  }

  export type CourseListRelationFilter = {
    every?: CourseWhereInput
    some?: CourseWhereInput
    none?: CourseWhereInput
  }

  export type AcademicStageListRelationFilter = {
    every?: AcademicStageWhereInput
    some?: AcademicStageWhereInput
    none?: AcademicStageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ExamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcademicStageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    geminiApiKey?: SortOrder
    geminiModel?: SortOrder
    platformName?: SortOrder
    teacherTitle?: SortOrder
    teacherBio?: SortOrder
    teacherExperience?: SortOrder
    teacherStudentsCount?: SortOrder
    teacherCoursesCount?: SortOrder
    heroBadge?: SortOrder
    heroTitle?: SortOrder
    heroSubtitle?: SortOrder
    teacherImageUrl?: SortOrder
    brandTheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    geminiApiKey?: SortOrder
    geminiModel?: SortOrder
    platformName?: SortOrder
    teacherTitle?: SortOrder
    teacherBio?: SortOrder
    teacherExperience?: SortOrder
    teacherStudentsCount?: SortOrder
    teacherCoursesCount?: SortOrder
    heroBadge?: SortOrder
    heroTitle?: SortOrder
    heroSubtitle?: SortOrder
    teacherImageUrl?: SortOrder
    brandTheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    geminiApiKey?: SortOrder
    geminiModel?: SortOrder
    platformName?: SortOrder
    teacherTitle?: SortOrder
    teacherBio?: SortOrder
    teacherExperience?: SortOrder
    teacherStudentsCount?: SortOrder
    teacherCoursesCount?: SortOrder
    heroBadge?: SortOrder
    heroTitle?: SortOrder
    heroSubtitle?: SortOrder
    teacherImageUrl?: SortOrder
    brandTheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AcademicStageCountOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    name?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type AcademicStageAvgOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type AcademicStageMaxOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    name?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type AcademicStageMinOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    name?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type AcademicStageSumOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ExamAttemptListRelationFilter = {
    every?: ExamAttemptWhereInput
    some?: ExamAttemptWhereInput
    none?: ExamAttemptWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type ExamAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    parentPhone?: SortOrder
    stage?: SortOrder
    groupName?: SortOrder
    semester?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    parentPhone?: SortOrder
    stage?: SortOrder
    groupName?: SortOrder
    semester?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    parentPhone?: SortOrder
    stage?: SortOrder
    groupName?: SortOrder
    semester?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StudentRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    title?: SortOrder
    stage?: SortOrder
    description?: SortOrder
    badge?: SortOrder
    lessonsCount?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    themeColor?: SortOrder
    isPublished?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    lessonsCount?: SortOrder
    orderIndex?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    title?: SortOrder
    stage?: SortOrder
    description?: SortOrder
    badge?: SortOrder
    lessonsCount?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    themeColor?: SortOrder
    isPublished?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    title?: SortOrder
    stage?: SortOrder
    description?: SortOrder
    badge?: SortOrder
    lessonsCount?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    themeColor?: SortOrder
    isPublished?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    lessonsCount?: SortOrder
    orderIndex?: SortOrder
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    name?: SortOrder
    stage?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    name?: SortOrder
    stage?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    name?: SortOrder
    stage?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type QuestionListRelationFilter = {
    every?: QuestionWhereInput
    some?: QuestionWhereInput
    none?: QuestionWhereInput
  }

  export type QuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExamCountOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    durationMinutes?: SortOrder
    status?: SortOrder
    allowMultipleAttempts?: SortOrder
    maxAttempts?: SortOrder
    targetStage?: SortOrder
    targetGroup?: SortOrder
    targetSemester?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    examType?: SortOrder
    showResultsDirectly?: SortOrder
    requirePhone?: SortOrder
    requireGroup?: SortOrder
    groupsList?: SortOrder
    totalPoints?: SortOrder
    passingPercentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExamAvgOrderByAggregateInput = {
    durationMinutes?: SortOrder
    maxAttempts?: SortOrder
    totalPoints?: SortOrder
    passingPercentage?: SortOrder
  }

  export type ExamMaxOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    durationMinutes?: SortOrder
    status?: SortOrder
    allowMultipleAttempts?: SortOrder
    maxAttempts?: SortOrder
    targetStage?: SortOrder
    targetGroup?: SortOrder
    targetSemester?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    examType?: SortOrder
    showResultsDirectly?: SortOrder
    requirePhone?: SortOrder
    requireGroup?: SortOrder
    groupsList?: SortOrder
    totalPoints?: SortOrder
    passingPercentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExamMinOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    durationMinutes?: SortOrder
    status?: SortOrder
    allowMultipleAttempts?: SortOrder
    maxAttempts?: SortOrder
    targetStage?: SortOrder
    targetGroup?: SortOrder
    targetSemester?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    examType?: SortOrder
    showResultsDirectly?: SortOrder
    requirePhone?: SortOrder
    requireGroup?: SortOrder
    groupsList?: SortOrder
    totalPoints?: SortOrder
    passingPercentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExamSumOrderByAggregateInput = {
    durationMinutes?: SortOrder
    maxAttempts?: SortOrder
    totalPoints?: SortOrder
    passingPercentage?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ExamRelationFilter = {
    is?: ExamWhereInput
    isNot?: ExamWhereInput
  }

  export type QuestionOptionListRelationFilter = {
    every?: QuestionOptionWhereInput
    some?: QuestionOptionWhereInput
    none?: QuestionOptionWhereInput
  }

  export type StudentAnswerListRelationFilter = {
    every?: StudentAnswerWhereInput
    some?: StudentAnswerWhereInput
    none?: StudentAnswerWhereInput
  }

  export type QuestionOptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    examId?: SortOrder
    questionNumber?: SortOrder
    type?: SortOrder
    questionText?: SortOrder
    points?: SortOrder
    correctOptionId?: SortOrder
    needsReview?: SortOrder
    orderIndex?: SortOrder
  }

  export type QuestionAvgOrderByAggregateInput = {
    questionNumber?: SortOrder
    points?: SortOrder
    orderIndex?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    examId?: SortOrder
    questionNumber?: SortOrder
    type?: SortOrder
    questionText?: SortOrder
    points?: SortOrder
    correctOptionId?: SortOrder
    needsReview?: SortOrder
    orderIndex?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    examId?: SortOrder
    questionNumber?: SortOrder
    type?: SortOrder
    questionText?: SortOrder
    points?: SortOrder
    correctOptionId?: SortOrder
    needsReview?: SortOrder
    orderIndex?: SortOrder
  }

  export type QuestionSumOrderByAggregateInput = {
    questionNumber?: SortOrder
    points?: SortOrder
    orderIndex?: SortOrder
  }

  export type QuestionRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type QuestionOptionCountOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    optionKey?: SortOrder
    text?: SortOrder
  }

  export type QuestionOptionMaxOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    optionKey?: SortOrder
    text?: SortOrder
  }

  export type QuestionOptionMinOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    optionKey?: SortOrder
    text?: SortOrder
  }

  export type StudentNullableRelationFilter = {
    is?: StudentWhereInput | null
    isNot?: StudentWhereInput | null
  }

  export type ExamAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    examId?: SortOrder
    studentId?: SortOrder
    studentName?: SortOrder
    studentPhone?: SortOrder
    studentGroup?: SortOrder
    extraData?: SortOrder
    startedAt?: SortOrder
    submittedAt?: SortOrder
    timeSpentSeconds?: SortOrder
    status?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    teacherNotes?: SortOrder
    mcqScore?: SortOrder
    essayScore?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
    isPassed?: SortOrder
    createdAt?: SortOrder
  }

  export type ExamAttemptAvgOrderByAggregateInput = {
    timeSpentSeconds?: SortOrder
    mcqScore?: SortOrder
    essayScore?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
  }

  export type ExamAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    examId?: SortOrder
    studentId?: SortOrder
    studentName?: SortOrder
    studentPhone?: SortOrder
    studentGroup?: SortOrder
    extraData?: SortOrder
    startedAt?: SortOrder
    submittedAt?: SortOrder
    timeSpentSeconds?: SortOrder
    status?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    teacherNotes?: SortOrder
    mcqScore?: SortOrder
    essayScore?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
    isPassed?: SortOrder
    createdAt?: SortOrder
  }

  export type ExamAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    examId?: SortOrder
    studentId?: SortOrder
    studentName?: SortOrder
    studentPhone?: SortOrder
    studentGroup?: SortOrder
    extraData?: SortOrder
    startedAt?: SortOrder
    submittedAt?: SortOrder
    timeSpentSeconds?: SortOrder
    status?: SortOrder
    isApproved?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    teacherNotes?: SortOrder
    mcqScore?: SortOrder
    essayScore?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
    isPassed?: SortOrder
    createdAt?: SortOrder
  }

  export type ExamAttemptSumOrderByAggregateInput = {
    timeSpentSeconds?: SortOrder
    mcqScore?: SortOrder
    essayScore?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type ExamAttemptRelationFilter = {
    is?: ExamAttemptWhereInput
    isNot?: ExamAttemptWhereInput
  }

  export type StudentAnswerCountOrderByAggregateInput = {
    id?: SortOrder
    attemptId?: SortOrder
    questionId?: SortOrder
    selectedOption?: SortOrder
    essayAnswer?: SortOrder
    isCorrect?: SortOrder
    pointsAwarded?: SortOrder
    teacherFeedback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentAnswerAvgOrderByAggregateInput = {
    pointsAwarded?: SortOrder
  }

  export type StudentAnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    attemptId?: SortOrder
    questionId?: SortOrder
    selectedOption?: SortOrder
    essayAnswer?: SortOrder
    isCorrect?: SortOrder
    pointsAwarded?: SortOrder
    teacherFeedback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentAnswerMinOrderByAggregateInput = {
    id?: SortOrder
    attemptId?: SortOrder
    questionId?: SortOrder
    selectedOption?: SortOrder
    essayAnswer?: SortOrder
    isCorrect?: SortOrder
    pointsAwarded?: SortOrder
    teacherFeedback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentAnswerSumOrderByAggregateInput = {
    pointsAwarded?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type ExamCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput> | ExamCreateWithoutTeacherInput[] | ExamUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutTeacherInput | ExamCreateOrConnectWithoutTeacherInput[]
    createMany?: ExamCreateManyTeacherInputEnvelope
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
  }

  export type GroupCreateNestedManyWithoutTeacherInput = {
    create?: XOR<GroupCreateWithoutTeacherInput, GroupUncheckedCreateWithoutTeacherInput> | GroupCreateWithoutTeacherInput[] | GroupUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutTeacherInput | GroupCreateOrConnectWithoutTeacherInput[]
    createMany?: GroupCreateManyTeacherInputEnvelope
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type CourseCreateNestedManyWithoutTeacherInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type AcademicStageCreateNestedManyWithoutTeacherInput = {
    create?: XOR<AcademicStageCreateWithoutTeacherInput, AcademicStageUncheckedCreateWithoutTeacherInput> | AcademicStageCreateWithoutTeacherInput[] | AcademicStageUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AcademicStageCreateOrConnectWithoutTeacherInput | AcademicStageCreateOrConnectWithoutTeacherInput[]
    createMany?: AcademicStageCreateManyTeacherInputEnvelope
    connect?: AcademicStageWhereUniqueInput | AcademicStageWhereUniqueInput[]
  }

  export type ExamUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput> | ExamCreateWithoutTeacherInput[] | ExamUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutTeacherInput | ExamCreateOrConnectWithoutTeacherInput[]
    createMany?: ExamCreateManyTeacherInputEnvelope
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
  }

  export type GroupUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<GroupCreateWithoutTeacherInput, GroupUncheckedCreateWithoutTeacherInput> | GroupCreateWithoutTeacherInput[] | GroupUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutTeacherInput | GroupCreateOrConnectWithoutTeacherInput[]
    createMany?: GroupCreateManyTeacherInputEnvelope
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type AcademicStageUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<AcademicStageCreateWithoutTeacherInput, AcademicStageUncheckedCreateWithoutTeacherInput> | AcademicStageCreateWithoutTeacherInput[] | AcademicStageUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AcademicStageCreateOrConnectWithoutTeacherInput | AcademicStageCreateOrConnectWithoutTeacherInput[]
    createMany?: AcademicStageCreateManyTeacherInputEnvelope
    connect?: AcademicStageWhereUniqueInput | AcademicStageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ExamUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput> | ExamCreateWithoutTeacherInput[] | ExamUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutTeacherInput | ExamCreateOrConnectWithoutTeacherInput[]
    upsert?: ExamUpsertWithWhereUniqueWithoutTeacherInput | ExamUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ExamCreateManyTeacherInputEnvelope
    set?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    disconnect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    delete?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    update?: ExamUpdateWithWhereUniqueWithoutTeacherInput | ExamUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ExamUpdateManyWithWhereWithoutTeacherInput | ExamUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ExamScalarWhereInput | ExamScalarWhereInput[]
  }

  export type GroupUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<GroupCreateWithoutTeacherInput, GroupUncheckedCreateWithoutTeacherInput> | GroupCreateWithoutTeacherInput[] | GroupUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutTeacherInput | GroupCreateOrConnectWithoutTeacherInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutTeacherInput | GroupUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: GroupCreateManyTeacherInputEnvelope
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutTeacherInput | GroupUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutTeacherInput | GroupUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type CourseUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutTeacherInput | CourseUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutTeacherInput | CourseUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutTeacherInput | CourseUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type AcademicStageUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<AcademicStageCreateWithoutTeacherInput, AcademicStageUncheckedCreateWithoutTeacherInput> | AcademicStageCreateWithoutTeacherInput[] | AcademicStageUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AcademicStageCreateOrConnectWithoutTeacherInput | AcademicStageCreateOrConnectWithoutTeacherInput[]
    upsert?: AcademicStageUpsertWithWhereUniqueWithoutTeacherInput | AcademicStageUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: AcademicStageCreateManyTeacherInputEnvelope
    set?: AcademicStageWhereUniqueInput | AcademicStageWhereUniqueInput[]
    disconnect?: AcademicStageWhereUniqueInput | AcademicStageWhereUniqueInput[]
    delete?: AcademicStageWhereUniqueInput | AcademicStageWhereUniqueInput[]
    connect?: AcademicStageWhereUniqueInput | AcademicStageWhereUniqueInput[]
    update?: AcademicStageUpdateWithWhereUniqueWithoutTeacherInput | AcademicStageUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: AcademicStageUpdateManyWithWhereWithoutTeacherInput | AcademicStageUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: AcademicStageScalarWhereInput | AcademicStageScalarWhereInput[]
  }

  export type ExamUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput> | ExamCreateWithoutTeacherInput[] | ExamUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutTeacherInput | ExamCreateOrConnectWithoutTeacherInput[]
    upsert?: ExamUpsertWithWhereUniqueWithoutTeacherInput | ExamUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ExamCreateManyTeacherInputEnvelope
    set?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    disconnect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    delete?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    update?: ExamUpdateWithWhereUniqueWithoutTeacherInput | ExamUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ExamUpdateManyWithWhereWithoutTeacherInput | ExamUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ExamScalarWhereInput | ExamScalarWhereInput[]
  }

  export type GroupUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<GroupCreateWithoutTeacherInput, GroupUncheckedCreateWithoutTeacherInput> | GroupCreateWithoutTeacherInput[] | GroupUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutTeacherInput | GroupCreateOrConnectWithoutTeacherInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutTeacherInput | GroupUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: GroupCreateManyTeacherInputEnvelope
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutTeacherInput | GroupUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutTeacherInput | GroupUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutTeacherInput | CourseUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: CourseCreateManyTeacherInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutTeacherInput | CourseUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutTeacherInput | CourseUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type AcademicStageUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<AcademicStageCreateWithoutTeacherInput, AcademicStageUncheckedCreateWithoutTeacherInput> | AcademicStageCreateWithoutTeacherInput[] | AcademicStageUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AcademicStageCreateOrConnectWithoutTeacherInput | AcademicStageCreateOrConnectWithoutTeacherInput[]
    upsert?: AcademicStageUpsertWithWhereUniqueWithoutTeacherInput | AcademicStageUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: AcademicStageCreateManyTeacherInputEnvelope
    set?: AcademicStageWhereUniqueInput | AcademicStageWhereUniqueInput[]
    disconnect?: AcademicStageWhereUniqueInput | AcademicStageWhereUniqueInput[]
    delete?: AcademicStageWhereUniqueInput | AcademicStageWhereUniqueInput[]
    connect?: AcademicStageWhereUniqueInput | AcademicStageWhereUniqueInput[]
    update?: AcademicStageUpdateWithWhereUniqueWithoutTeacherInput | AcademicStageUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: AcademicStageUpdateManyWithWhereWithoutTeacherInput | AcademicStageUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: AcademicStageScalarWhereInput | AcademicStageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStagesInput = {
    create?: XOR<UserCreateWithoutStagesInput, UserUncheckedCreateWithoutStagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStagesInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutStagesNestedInput = {
    create?: XOR<UserCreateWithoutStagesInput, UserUncheckedCreateWithoutStagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStagesInput
    upsert?: UserUpsertWithoutStagesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStagesInput, UserUpdateWithoutStagesInput>, UserUncheckedUpdateWithoutStagesInput>
  }

  export type ExamAttemptCreateNestedManyWithoutStudentInput = {
    create?: XOR<ExamAttemptCreateWithoutStudentInput, ExamAttemptUncheckedCreateWithoutStudentInput> | ExamAttemptCreateWithoutStudentInput[] | ExamAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutStudentInput | ExamAttemptCreateOrConnectWithoutStudentInput[]
    createMany?: ExamAttemptCreateManyStudentInputEnvelope
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutStudentInput = {
    create?: XOR<NotificationCreateWithoutStudentInput, NotificationUncheckedCreateWithoutStudentInput> | NotificationCreateWithoutStudentInput[] | NotificationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutStudentInput | NotificationCreateOrConnectWithoutStudentInput[]
    createMany?: NotificationCreateManyStudentInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ExamAttemptUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ExamAttemptCreateWithoutStudentInput, ExamAttemptUncheckedCreateWithoutStudentInput> | ExamAttemptCreateWithoutStudentInput[] | ExamAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutStudentInput | ExamAttemptCreateOrConnectWithoutStudentInput[]
    createMany?: ExamAttemptCreateManyStudentInputEnvelope
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<NotificationCreateWithoutStudentInput, NotificationUncheckedCreateWithoutStudentInput> | NotificationCreateWithoutStudentInput[] | NotificationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutStudentInput | NotificationCreateOrConnectWithoutStudentInput[]
    createMany?: NotificationCreateManyStudentInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ExamAttemptUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ExamAttemptCreateWithoutStudentInput, ExamAttemptUncheckedCreateWithoutStudentInput> | ExamAttemptCreateWithoutStudentInput[] | ExamAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutStudentInput | ExamAttemptCreateOrConnectWithoutStudentInput[]
    upsert?: ExamAttemptUpsertWithWhereUniqueWithoutStudentInput | ExamAttemptUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ExamAttemptCreateManyStudentInputEnvelope
    set?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    disconnect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    delete?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    update?: ExamAttemptUpdateWithWhereUniqueWithoutStudentInput | ExamAttemptUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ExamAttemptUpdateManyWithWhereWithoutStudentInput | ExamAttemptUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutStudentNestedInput = {
    create?: XOR<NotificationCreateWithoutStudentInput, NotificationUncheckedCreateWithoutStudentInput> | NotificationCreateWithoutStudentInput[] | NotificationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutStudentInput | NotificationCreateOrConnectWithoutStudentInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutStudentInput | NotificationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: NotificationCreateManyStudentInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutStudentInput | NotificationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutStudentInput | NotificationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ExamAttemptUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ExamAttemptCreateWithoutStudentInput, ExamAttemptUncheckedCreateWithoutStudentInput> | ExamAttemptCreateWithoutStudentInput[] | ExamAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutStudentInput | ExamAttemptCreateOrConnectWithoutStudentInput[]
    upsert?: ExamAttemptUpsertWithWhereUniqueWithoutStudentInput | ExamAttemptUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ExamAttemptCreateManyStudentInputEnvelope
    set?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    disconnect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    delete?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    update?: ExamAttemptUpdateWithWhereUniqueWithoutStudentInput | ExamAttemptUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ExamAttemptUpdateManyWithWhereWithoutStudentInput | ExamAttemptUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<NotificationCreateWithoutStudentInput, NotificationUncheckedCreateWithoutStudentInput> | NotificationCreateWithoutStudentInput[] | NotificationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutStudentInput | NotificationCreateOrConnectWithoutStudentInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutStudentInput | NotificationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: NotificationCreateManyStudentInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutStudentInput | NotificationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutStudentInput | NotificationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<StudentCreateWithoutNotificationsInput, StudentUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutNotificationsInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<StudentCreateWithoutNotificationsInput, StudentUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutNotificationsInput
    upsert?: StudentUpsertWithoutNotificationsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutNotificationsInput, StudentUpdateWithoutNotificationsInput>, StudentUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutCoursesInput = {
    create?: XOR<UserCreateWithoutCoursesInput, UserUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCoursesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCoursesNestedInput = {
    create?: XOR<UserCreateWithoutCoursesInput, UserUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCoursesInput
    upsert?: UserUpsertWithoutCoursesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCoursesInput, UserUpdateWithoutCoursesInput>, UserUncheckedUpdateWithoutCoursesInput>
  }

  export type UserCreateNestedOneWithoutGroupsInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGroupsNestedInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput
    upsert?: UserUpsertWithoutGroupsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGroupsInput, UserUpdateWithoutGroupsInput>, UserUncheckedUpdateWithoutGroupsInput>
  }

  export type UserCreateNestedOneWithoutExamsInput = {
    create?: XOR<UserCreateWithoutExamsInput, UserUncheckedCreateWithoutExamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExamsInput
    connect?: UserWhereUniqueInput
  }

  export type QuestionCreateNestedManyWithoutExamInput = {
    create?: XOR<QuestionCreateWithoutExamInput, QuestionUncheckedCreateWithoutExamInput> | QuestionCreateWithoutExamInput[] | QuestionUncheckedCreateWithoutExamInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutExamInput | QuestionCreateOrConnectWithoutExamInput[]
    createMany?: QuestionCreateManyExamInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type ExamAttemptCreateNestedManyWithoutExamInput = {
    create?: XOR<ExamAttemptCreateWithoutExamInput, ExamAttemptUncheckedCreateWithoutExamInput> | ExamAttemptCreateWithoutExamInput[] | ExamAttemptUncheckedCreateWithoutExamInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutExamInput | ExamAttemptCreateOrConnectWithoutExamInput[]
    createMany?: ExamAttemptCreateManyExamInputEnvelope
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
  }

  export type QuestionUncheckedCreateNestedManyWithoutExamInput = {
    create?: XOR<QuestionCreateWithoutExamInput, QuestionUncheckedCreateWithoutExamInput> | QuestionCreateWithoutExamInput[] | QuestionUncheckedCreateWithoutExamInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutExamInput | QuestionCreateOrConnectWithoutExamInput[]
    createMany?: QuestionCreateManyExamInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type ExamAttemptUncheckedCreateNestedManyWithoutExamInput = {
    create?: XOR<ExamAttemptCreateWithoutExamInput, ExamAttemptUncheckedCreateWithoutExamInput> | ExamAttemptCreateWithoutExamInput[] | ExamAttemptUncheckedCreateWithoutExamInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutExamInput | ExamAttemptCreateOrConnectWithoutExamInput[]
    createMany?: ExamAttemptCreateManyExamInputEnvelope
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutExamsNestedInput = {
    create?: XOR<UserCreateWithoutExamsInput, UserUncheckedCreateWithoutExamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExamsInput
    upsert?: UserUpsertWithoutExamsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExamsInput, UserUpdateWithoutExamsInput>, UserUncheckedUpdateWithoutExamsInput>
  }

  export type QuestionUpdateManyWithoutExamNestedInput = {
    create?: XOR<QuestionCreateWithoutExamInput, QuestionUncheckedCreateWithoutExamInput> | QuestionCreateWithoutExamInput[] | QuestionUncheckedCreateWithoutExamInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutExamInput | QuestionCreateOrConnectWithoutExamInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutExamInput | QuestionUpsertWithWhereUniqueWithoutExamInput[]
    createMany?: QuestionCreateManyExamInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutExamInput | QuestionUpdateWithWhereUniqueWithoutExamInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutExamInput | QuestionUpdateManyWithWhereWithoutExamInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type ExamAttemptUpdateManyWithoutExamNestedInput = {
    create?: XOR<ExamAttemptCreateWithoutExamInput, ExamAttemptUncheckedCreateWithoutExamInput> | ExamAttemptCreateWithoutExamInput[] | ExamAttemptUncheckedCreateWithoutExamInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutExamInput | ExamAttemptCreateOrConnectWithoutExamInput[]
    upsert?: ExamAttemptUpsertWithWhereUniqueWithoutExamInput | ExamAttemptUpsertWithWhereUniqueWithoutExamInput[]
    createMany?: ExamAttemptCreateManyExamInputEnvelope
    set?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    disconnect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    delete?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    update?: ExamAttemptUpdateWithWhereUniqueWithoutExamInput | ExamAttemptUpdateWithWhereUniqueWithoutExamInput[]
    updateMany?: ExamAttemptUpdateManyWithWhereWithoutExamInput | ExamAttemptUpdateManyWithWhereWithoutExamInput[]
    deleteMany?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
  }

  export type QuestionUncheckedUpdateManyWithoutExamNestedInput = {
    create?: XOR<QuestionCreateWithoutExamInput, QuestionUncheckedCreateWithoutExamInput> | QuestionCreateWithoutExamInput[] | QuestionUncheckedCreateWithoutExamInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutExamInput | QuestionCreateOrConnectWithoutExamInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutExamInput | QuestionUpsertWithWhereUniqueWithoutExamInput[]
    createMany?: QuestionCreateManyExamInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutExamInput | QuestionUpdateWithWhereUniqueWithoutExamInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutExamInput | QuestionUpdateManyWithWhereWithoutExamInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type ExamAttemptUncheckedUpdateManyWithoutExamNestedInput = {
    create?: XOR<ExamAttemptCreateWithoutExamInput, ExamAttemptUncheckedCreateWithoutExamInput> | ExamAttemptCreateWithoutExamInput[] | ExamAttemptUncheckedCreateWithoutExamInput[]
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutExamInput | ExamAttemptCreateOrConnectWithoutExamInput[]
    upsert?: ExamAttemptUpsertWithWhereUniqueWithoutExamInput | ExamAttemptUpsertWithWhereUniqueWithoutExamInput[]
    createMany?: ExamAttemptCreateManyExamInputEnvelope
    set?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    disconnect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    delete?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    connect?: ExamAttemptWhereUniqueInput | ExamAttemptWhereUniqueInput[]
    update?: ExamAttemptUpdateWithWhereUniqueWithoutExamInput | ExamAttemptUpdateWithWhereUniqueWithoutExamInput[]
    updateMany?: ExamAttemptUpdateManyWithWhereWithoutExamInput | ExamAttemptUpdateManyWithWhereWithoutExamInput[]
    deleteMany?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
  }

  export type ExamCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<ExamCreateWithoutQuestionsInput, ExamUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: ExamCreateOrConnectWithoutQuestionsInput
    connect?: ExamWhereUniqueInput
  }

  export type QuestionOptionCreateNestedManyWithoutQuestionInput = {
    create?: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput> | QuestionOptionCreateWithoutQuestionInput[] | QuestionOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutQuestionInput | QuestionOptionCreateOrConnectWithoutQuestionInput[]
    createMany?: QuestionOptionCreateManyQuestionInputEnvelope
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
  }

  export type StudentAnswerCreateNestedManyWithoutQuestionInput = {
    create?: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput> | StudentAnswerCreateWithoutQuestionInput[] | StudentAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutQuestionInput | StudentAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: StudentAnswerCreateManyQuestionInputEnvelope
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
  }

  export type QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput> | QuestionOptionCreateWithoutQuestionInput[] | QuestionOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutQuestionInput | QuestionOptionCreateOrConnectWithoutQuestionInput[]
    createMany?: QuestionOptionCreateManyQuestionInputEnvelope
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
  }

  export type StudentAnswerUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput> | StudentAnswerCreateWithoutQuestionInput[] | StudentAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutQuestionInput | StudentAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: StudentAnswerCreateManyQuestionInputEnvelope
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
  }

  export type ExamUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<ExamCreateWithoutQuestionsInput, ExamUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: ExamCreateOrConnectWithoutQuestionsInput
    upsert?: ExamUpsertWithoutQuestionsInput
    connect?: ExamWhereUniqueInput
    update?: XOR<XOR<ExamUpdateToOneWithWhereWithoutQuestionsInput, ExamUpdateWithoutQuestionsInput>, ExamUncheckedUpdateWithoutQuestionsInput>
  }

  export type QuestionOptionUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput> | QuestionOptionCreateWithoutQuestionInput[] | QuestionOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutQuestionInput | QuestionOptionCreateOrConnectWithoutQuestionInput[]
    upsert?: QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput | QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: QuestionOptionCreateManyQuestionInputEnvelope
    set?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    disconnect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    delete?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    update?: QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput | QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: QuestionOptionUpdateManyWithWhereWithoutQuestionInput | QuestionOptionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
  }

  export type StudentAnswerUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput> | StudentAnswerCreateWithoutQuestionInput[] | StudentAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutQuestionInput | StudentAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: StudentAnswerUpsertWithWhereUniqueWithoutQuestionInput | StudentAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: StudentAnswerCreateManyQuestionInputEnvelope
    set?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    disconnect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    delete?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    update?: StudentAnswerUpdateWithWhereUniqueWithoutQuestionInput | StudentAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: StudentAnswerUpdateManyWithWhereWithoutQuestionInput | StudentAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
  }

  export type QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput> | QuestionOptionCreateWithoutQuestionInput[] | QuestionOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutQuestionInput | QuestionOptionCreateOrConnectWithoutQuestionInput[]
    upsert?: QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput | QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: QuestionOptionCreateManyQuestionInputEnvelope
    set?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    disconnect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    delete?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    update?: QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput | QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: QuestionOptionUpdateManyWithWhereWithoutQuestionInput | QuestionOptionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
  }

  export type StudentAnswerUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput> | StudentAnswerCreateWithoutQuestionInput[] | StudentAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutQuestionInput | StudentAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: StudentAnswerUpsertWithWhereUniqueWithoutQuestionInput | StudentAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: StudentAnswerCreateManyQuestionInputEnvelope
    set?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    disconnect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    delete?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    update?: StudentAnswerUpdateWithWhereUniqueWithoutQuestionInput | StudentAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: StudentAnswerUpdateManyWithWhereWithoutQuestionInput | StudentAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
  }

  export type QuestionCreateNestedOneWithoutOptionsInput = {
    create?: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutOptionsInput
    connect?: QuestionWhereUniqueInput
  }

  export type QuestionUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutOptionsInput
    upsert?: QuestionUpsertWithoutOptionsInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutOptionsInput, QuestionUpdateWithoutOptionsInput>, QuestionUncheckedUpdateWithoutOptionsInput>
  }

  export type ExamCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<ExamCreateWithoutAttemptsInput, ExamUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: ExamCreateOrConnectWithoutAttemptsInput
    connect?: ExamWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<StudentCreateWithoutAttemptsInput, StudentUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAttemptsInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentAnswerCreateNestedManyWithoutAttemptInput = {
    create?: XOR<StudentAnswerCreateWithoutAttemptInput, StudentAnswerUncheckedCreateWithoutAttemptInput> | StudentAnswerCreateWithoutAttemptInput[] | StudentAnswerUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutAttemptInput | StudentAnswerCreateOrConnectWithoutAttemptInput[]
    createMany?: StudentAnswerCreateManyAttemptInputEnvelope
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
  }

  export type StudentAnswerUncheckedCreateNestedManyWithoutAttemptInput = {
    create?: XOR<StudentAnswerCreateWithoutAttemptInput, StudentAnswerUncheckedCreateWithoutAttemptInput> | StudentAnswerCreateWithoutAttemptInput[] | StudentAnswerUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutAttemptInput | StudentAnswerCreateOrConnectWithoutAttemptInput[]
    createMany?: StudentAnswerCreateManyAttemptInputEnvelope
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
  }

  export type ExamUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: XOR<ExamCreateWithoutAttemptsInput, ExamUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: ExamCreateOrConnectWithoutAttemptsInput
    upsert?: ExamUpsertWithoutAttemptsInput
    connect?: ExamWhereUniqueInput
    update?: XOR<XOR<ExamUpdateToOneWithWhereWithoutAttemptsInput, ExamUpdateWithoutAttemptsInput>, ExamUncheckedUpdateWithoutAttemptsInput>
  }

  export type StudentUpdateOneWithoutAttemptsNestedInput = {
    create?: XOR<StudentCreateWithoutAttemptsInput, StudentUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAttemptsInput
    upsert?: StudentUpsertWithoutAttemptsInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutAttemptsInput, StudentUpdateWithoutAttemptsInput>, StudentUncheckedUpdateWithoutAttemptsInput>
  }

  export type StudentAnswerUpdateManyWithoutAttemptNestedInput = {
    create?: XOR<StudentAnswerCreateWithoutAttemptInput, StudentAnswerUncheckedCreateWithoutAttemptInput> | StudentAnswerCreateWithoutAttemptInput[] | StudentAnswerUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutAttemptInput | StudentAnswerCreateOrConnectWithoutAttemptInput[]
    upsert?: StudentAnswerUpsertWithWhereUniqueWithoutAttemptInput | StudentAnswerUpsertWithWhereUniqueWithoutAttemptInput[]
    createMany?: StudentAnswerCreateManyAttemptInputEnvelope
    set?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    disconnect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    delete?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    update?: StudentAnswerUpdateWithWhereUniqueWithoutAttemptInput | StudentAnswerUpdateWithWhereUniqueWithoutAttemptInput[]
    updateMany?: StudentAnswerUpdateManyWithWhereWithoutAttemptInput | StudentAnswerUpdateManyWithWhereWithoutAttemptInput[]
    deleteMany?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
  }

  export type StudentAnswerUncheckedUpdateManyWithoutAttemptNestedInput = {
    create?: XOR<StudentAnswerCreateWithoutAttemptInput, StudentAnswerUncheckedCreateWithoutAttemptInput> | StudentAnswerCreateWithoutAttemptInput[] | StudentAnswerUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: StudentAnswerCreateOrConnectWithoutAttemptInput | StudentAnswerCreateOrConnectWithoutAttemptInput[]
    upsert?: StudentAnswerUpsertWithWhereUniqueWithoutAttemptInput | StudentAnswerUpsertWithWhereUniqueWithoutAttemptInput[]
    createMany?: StudentAnswerCreateManyAttemptInputEnvelope
    set?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    disconnect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    delete?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    connect?: StudentAnswerWhereUniqueInput | StudentAnswerWhereUniqueInput[]
    update?: StudentAnswerUpdateWithWhereUniqueWithoutAttemptInput | StudentAnswerUpdateWithWhereUniqueWithoutAttemptInput[]
    updateMany?: StudentAnswerUpdateManyWithWhereWithoutAttemptInput | StudentAnswerUpdateManyWithWhereWithoutAttemptInput[]
    deleteMany?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
  }

  export type ExamAttemptCreateNestedOneWithoutAnswersInput = {
    create?: XOR<ExamAttemptCreateWithoutAnswersInput, ExamAttemptUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutAnswersInput
    connect?: ExamAttemptWhereUniqueInput
  }

  export type QuestionCreateNestedOneWithoutAnswersInput = {
    create?: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput
    connect?: QuestionWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type ExamAttemptUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<ExamAttemptCreateWithoutAnswersInput, ExamAttemptUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: ExamAttemptCreateOrConnectWithoutAnswersInput
    upsert?: ExamAttemptUpsertWithoutAnswersInput
    connect?: ExamAttemptWhereUniqueInput
    update?: XOR<XOR<ExamAttemptUpdateToOneWithWhereWithoutAnswersInput, ExamAttemptUpdateWithoutAnswersInput>, ExamAttemptUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput
    upsert?: QuestionUpsertWithoutAnswersInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutAnswersInput, QuestionUpdateWithoutAnswersInput>, QuestionUncheckedUpdateWithoutAnswersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type ExamCreateWithoutTeacherInput = {
    id?: string
    code: string
    title: string
    description?: string | null
    durationMinutes?: number | null
    status?: string
    allowMultipleAttempts?: boolean
    maxAttempts?: number
    targetStage?: string | null
    targetGroup?: string | null
    targetSemester?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    examType?: string
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: string
    totalPoints?: number
    passingPercentage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutExamInput
    attempts?: ExamAttemptCreateNestedManyWithoutExamInput
  }

  export type ExamUncheckedCreateWithoutTeacherInput = {
    id?: string
    code: string
    title: string
    description?: string | null
    durationMinutes?: number | null
    status?: string
    allowMultipleAttempts?: boolean
    maxAttempts?: number
    targetStage?: string | null
    targetGroup?: string | null
    targetSemester?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    examType?: string
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: string
    totalPoints?: number
    passingPercentage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutExamInput
    attempts?: ExamAttemptUncheckedCreateNestedManyWithoutExamInput
  }

  export type ExamCreateOrConnectWithoutTeacherInput = {
    where: ExamWhereUniqueInput
    create: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput>
  }

  export type ExamCreateManyTeacherInputEnvelope = {
    data: ExamCreateManyTeacherInput | ExamCreateManyTeacherInput[]
  }

  export type GroupCreateWithoutTeacherInput = {
    id?: string
    name: string
    stage?: string | null
    createdAt?: Date | string
  }

  export type GroupUncheckedCreateWithoutTeacherInput = {
    id?: string
    name: string
    stage?: string | null
    createdAt?: Date | string
  }

  export type GroupCreateOrConnectWithoutTeacherInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutTeacherInput, GroupUncheckedCreateWithoutTeacherInput>
  }

  export type GroupCreateManyTeacherInputEnvelope = {
    data: GroupCreateManyTeacherInput | GroupCreateManyTeacherInput[]
  }

  export type CourseCreateWithoutTeacherInput = {
    id?: string
    title: string
    stage: string
    description: string
    badge?: string
    lessonsCount?: number
    duration?: string
    price?: string | null
    themeColor?: string
    isPublished?: boolean
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUncheckedCreateWithoutTeacherInput = {
    id?: string
    title: string
    stage: string
    description: string
    badge?: string
    lessonsCount?: number
    duration?: string
    price?: string | null
    themeColor?: string
    isPublished?: boolean
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseCreateOrConnectWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput>
  }

  export type CourseCreateManyTeacherInputEnvelope = {
    data: CourseCreateManyTeacherInput | CourseCreateManyTeacherInput[]
  }

  export type AcademicStageCreateWithoutTeacherInput = {
    id?: string
    name: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type AcademicStageUncheckedCreateWithoutTeacherInput = {
    id?: string
    name: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type AcademicStageCreateOrConnectWithoutTeacherInput = {
    where: AcademicStageWhereUniqueInput
    create: XOR<AcademicStageCreateWithoutTeacherInput, AcademicStageUncheckedCreateWithoutTeacherInput>
  }

  export type AcademicStageCreateManyTeacherInputEnvelope = {
    data: AcademicStageCreateManyTeacherInput | AcademicStageCreateManyTeacherInput[]
  }

  export type ExamUpsertWithWhereUniqueWithoutTeacherInput = {
    where: ExamWhereUniqueInput
    update: XOR<ExamUpdateWithoutTeacherInput, ExamUncheckedUpdateWithoutTeacherInput>
    create: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput>
  }

  export type ExamUpdateWithWhereUniqueWithoutTeacherInput = {
    where: ExamWhereUniqueInput
    data: XOR<ExamUpdateWithoutTeacherInput, ExamUncheckedUpdateWithoutTeacherInput>
  }

  export type ExamUpdateManyWithWhereWithoutTeacherInput = {
    where: ExamScalarWhereInput
    data: XOR<ExamUpdateManyMutationInput, ExamUncheckedUpdateManyWithoutTeacherInput>
  }

  export type ExamScalarWhereInput = {
    AND?: ExamScalarWhereInput | ExamScalarWhereInput[]
    OR?: ExamScalarWhereInput[]
    NOT?: ExamScalarWhereInput | ExamScalarWhereInput[]
    id?: StringFilter<"Exam"> | string
    teacherId?: StringFilter<"Exam"> | string
    code?: StringFilter<"Exam"> | string
    title?: StringFilter<"Exam"> | string
    description?: StringNullableFilter<"Exam"> | string | null
    durationMinutes?: IntNullableFilter<"Exam"> | number | null
    status?: StringFilter<"Exam"> | string
    allowMultipleAttempts?: BoolFilter<"Exam"> | boolean
    maxAttempts?: IntFilter<"Exam"> | number
    targetStage?: StringNullableFilter<"Exam"> | string | null
    targetGroup?: StringNullableFilter<"Exam"> | string | null
    targetSemester?: StringNullableFilter<"Exam"> | string | null
    startsAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    endsAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    examType?: StringFilter<"Exam"> | string
    showResultsDirectly?: BoolFilter<"Exam"> | boolean
    requirePhone?: BoolFilter<"Exam"> | boolean
    requireGroup?: BoolFilter<"Exam"> | boolean
    groupsList?: StringFilter<"Exam"> | string
    totalPoints?: FloatFilter<"Exam"> | number
    passingPercentage?: FloatFilter<"Exam"> | number
    createdAt?: DateTimeFilter<"Exam"> | Date | string
    updatedAt?: DateTimeFilter<"Exam"> | Date | string
  }

  export type GroupUpsertWithWhereUniqueWithoutTeacherInput = {
    where: GroupWhereUniqueInput
    update: XOR<GroupUpdateWithoutTeacherInput, GroupUncheckedUpdateWithoutTeacherInput>
    create: XOR<GroupCreateWithoutTeacherInput, GroupUncheckedCreateWithoutTeacherInput>
  }

  export type GroupUpdateWithWhereUniqueWithoutTeacherInput = {
    where: GroupWhereUniqueInput
    data: XOR<GroupUpdateWithoutTeacherInput, GroupUncheckedUpdateWithoutTeacherInput>
  }

  export type GroupUpdateManyWithWhereWithoutTeacherInput = {
    where: GroupScalarWhereInput
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyWithoutTeacherInput>
  }

  export type GroupScalarWhereInput = {
    AND?: GroupScalarWhereInput | GroupScalarWhereInput[]
    OR?: GroupScalarWhereInput[]
    NOT?: GroupScalarWhereInput | GroupScalarWhereInput[]
    id?: StringFilter<"Group"> | string
    teacherId?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    stage?: StringNullableFilter<"Group"> | string | null
    createdAt?: DateTimeFilter<"Group"> | Date | string
  }

  export type CourseUpsertWithWhereUniqueWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutTeacherInput, CourseUncheckedUpdateWithoutTeacherInput>
    create: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutTeacherInput, CourseUncheckedUpdateWithoutTeacherInput>
  }

  export type CourseUpdateManyWithWhereWithoutTeacherInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutTeacherInput>
  }

  export type CourseScalarWhereInput = {
    AND?: CourseScalarWhereInput | CourseScalarWhereInput[]
    OR?: CourseScalarWhereInput[]
    NOT?: CourseScalarWhereInput | CourseScalarWhereInput[]
    id?: StringFilter<"Course"> | string
    teacherId?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    stage?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    badge?: StringFilter<"Course"> | string
    lessonsCount?: IntFilter<"Course"> | number
    duration?: StringFilter<"Course"> | string
    price?: StringNullableFilter<"Course"> | string | null
    themeColor?: StringFilter<"Course"> | string
    isPublished?: BoolFilter<"Course"> | boolean
    orderIndex?: IntFilter<"Course"> | number
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
  }

  export type AcademicStageUpsertWithWhereUniqueWithoutTeacherInput = {
    where: AcademicStageWhereUniqueInput
    update: XOR<AcademicStageUpdateWithoutTeacherInput, AcademicStageUncheckedUpdateWithoutTeacherInput>
    create: XOR<AcademicStageCreateWithoutTeacherInput, AcademicStageUncheckedCreateWithoutTeacherInput>
  }

  export type AcademicStageUpdateWithWhereUniqueWithoutTeacherInput = {
    where: AcademicStageWhereUniqueInput
    data: XOR<AcademicStageUpdateWithoutTeacherInput, AcademicStageUncheckedUpdateWithoutTeacherInput>
  }

  export type AcademicStageUpdateManyWithWhereWithoutTeacherInput = {
    where: AcademicStageScalarWhereInput
    data: XOR<AcademicStageUpdateManyMutationInput, AcademicStageUncheckedUpdateManyWithoutTeacherInput>
  }

  export type AcademicStageScalarWhereInput = {
    AND?: AcademicStageScalarWhereInput | AcademicStageScalarWhereInput[]
    OR?: AcademicStageScalarWhereInput[]
    NOT?: AcademicStageScalarWhereInput | AcademicStageScalarWhereInput[]
    id?: StringFilter<"AcademicStage"> | string
    teacherId?: StringNullableFilter<"AcademicStage"> | string | null
    name?: StringFilter<"AcademicStage"> | string
    orderIndex?: IntFilter<"AcademicStage"> | number
    createdAt?: DateTimeFilter<"AcademicStage"> | Date | string
  }

  export type UserCreateWithoutStagesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: ExamCreateNestedManyWithoutTeacherInput
    groups?: GroupCreateNestedManyWithoutTeacherInput
    courses?: CourseCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateWithoutStagesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: ExamUncheckedCreateNestedManyWithoutTeacherInput
    groups?: GroupUncheckedCreateNestedManyWithoutTeacherInput
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserCreateOrConnectWithoutStagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStagesInput, UserUncheckedCreateWithoutStagesInput>
  }

  export type UserUpsertWithoutStagesInput = {
    update: XOR<UserUpdateWithoutStagesInput, UserUncheckedUpdateWithoutStagesInput>
    create: XOR<UserCreateWithoutStagesInput, UserUncheckedCreateWithoutStagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStagesInput, UserUncheckedUpdateWithoutStagesInput>
  }

  export type UserUpdateWithoutStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUpdateManyWithoutTeacherNestedInput
    groups?: GroupUpdateManyWithoutTeacherNestedInput
    courses?: CourseUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateWithoutStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUncheckedUpdateManyWithoutTeacherNestedInput
    groups?: GroupUncheckedUpdateManyWithoutTeacherNestedInput
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type ExamAttemptCreateWithoutStudentInput = {
    id?: string
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
    exam: ExamCreateNestedOneWithoutAttemptsInput
    answers?: StudentAnswerCreateNestedManyWithoutAttemptInput
  }

  export type ExamAttemptUncheckedCreateWithoutStudentInput = {
    id?: string
    examId: string
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
    answers?: StudentAnswerUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type ExamAttemptCreateOrConnectWithoutStudentInput = {
    where: ExamAttemptWhereUniqueInput
    create: XOR<ExamAttemptCreateWithoutStudentInput, ExamAttemptUncheckedCreateWithoutStudentInput>
  }

  export type ExamAttemptCreateManyStudentInputEnvelope = {
    data: ExamAttemptCreateManyStudentInput | ExamAttemptCreateManyStudentInput[]
  }

  export type NotificationCreateWithoutStudentInput = {
    id?: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutStudentInput = {
    id?: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutStudentInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutStudentInput, NotificationUncheckedCreateWithoutStudentInput>
  }

  export type NotificationCreateManyStudentInputEnvelope = {
    data: NotificationCreateManyStudentInput | NotificationCreateManyStudentInput[]
  }

  export type ExamAttemptUpsertWithWhereUniqueWithoutStudentInput = {
    where: ExamAttemptWhereUniqueInput
    update: XOR<ExamAttemptUpdateWithoutStudentInput, ExamAttemptUncheckedUpdateWithoutStudentInput>
    create: XOR<ExamAttemptCreateWithoutStudentInput, ExamAttemptUncheckedCreateWithoutStudentInput>
  }

  export type ExamAttemptUpdateWithWhereUniqueWithoutStudentInput = {
    where: ExamAttemptWhereUniqueInput
    data: XOR<ExamAttemptUpdateWithoutStudentInput, ExamAttemptUncheckedUpdateWithoutStudentInput>
  }

  export type ExamAttemptUpdateManyWithWhereWithoutStudentInput = {
    where: ExamAttemptScalarWhereInput
    data: XOR<ExamAttemptUpdateManyMutationInput, ExamAttemptUncheckedUpdateManyWithoutStudentInput>
  }

  export type ExamAttemptScalarWhereInput = {
    AND?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
    OR?: ExamAttemptScalarWhereInput[]
    NOT?: ExamAttemptScalarWhereInput | ExamAttemptScalarWhereInput[]
    id?: StringFilter<"ExamAttempt"> | string
    examId?: StringFilter<"ExamAttempt"> | string
    studentId?: StringNullableFilter<"ExamAttempt"> | string | null
    studentName?: StringFilter<"ExamAttempt"> | string
    studentPhone?: StringFilter<"ExamAttempt"> | string
    studentGroup?: StringNullableFilter<"ExamAttempt"> | string | null
    extraData?: StringNullableFilter<"ExamAttempt"> | string | null
    startedAt?: DateTimeFilter<"ExamAttempt"> | Date | string
    submittedAt?: DateTimeNullableFilter<"ExamAttempt"> | Date | string | null
    timeSpentSeconds?: IntFilter<"ExamAttempt"> | number
    status?: StringFilter<"ExamAttempt"> | string
    isApproved?: BoolFilter<"ExamAttempt"> | boolean
    approvedAt?: DateTimeNullableFilter<"ExamAttempt"> | Date | string | null
    approvedBy?: StringNullableFilter<"ExamAttempt"> | string | null
    teacherNotes?: StringNullableFilter<"ExamAttempt"> | string | null
    mcqScore?: FloatFilter<"ExamAttempt"> | number
    essayScore?: FloatFilter<"ExamAttempt"> | number
    totalScore?: FloatFilter<"ExamAttempt"> | number
    maxScore?: FloatFilter<"ExamAttempt"> | number
    percentage?: FloatFilter<"ExamAttempt"> | number
    isPassed?: BoolFilter<"ExamAttempt"> | boolean
    createdAt?: DateTimeFilter<"ExamAttempt"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutStudentInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutStudentInput, NotificationUncheckedUpdateWithoutStudentInput>
    create: XOR<NotificationCreateWithoutStudentInput, NotificationUncheckedCreateWithoutStudentInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutStudentInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutStudentInput, NotificationUncheckedUpdateWithoutStudentInput>
  }

  export type NotificationUpdateManyWithWhereWithoutStudentInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutStudentInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    studentId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type StudentCreateWithoutNotificationsInput = {
    id?: string
    name: string
    username: string
    email?: string | null
    passwordHash: string
    phone: string
    parentPhone: string
    stage: string
    groupName: string
    semester?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    attempts?: ExamAttemptCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutNotificationsInput = {
    id?: string
    name: string
    username: string
    email?: string | null
    passwordHash: string
    phone: string
    parentPhone: string
    stage: string
    groupName: string
    semester?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    attempts?: ExamAttemptUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutNotificationsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutNotificationsInput, StudentUncheckedCreateWithoutNotificationsInput>
  }

  export type StudentUpsertWithoutNotificationsInput = {
    update: XOR<StudentUpdateWithoutNotificationsInput, StudentUncheckedUpdateWithoutNotificationsInput>
    create: XOR<StudentCreateWithoutNotificationsInput, StudentUncheckedCreateWithoutNotificationsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutNotificationsInput, StudentUncheckedUpdateWithoutNotificationsInput>
  }

  export type StudentUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: ExamAttemptUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: ExamAttemptUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type UserCreateWithoutCoursesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: ExamCreateNestedManyWithoutTeacherInput
    groups?: GroupCreateNestedManyWithoutTeacherInput
    stages?: AcademicStageCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateWithoutCoursesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: ExamUncheckedCreateNestedManyWithoutTeacherInput
    groups?: GroupUncheckedCreateNestedManyWithoutTeacherInput
    stages?: AcademicStageUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserCreateOrConnectWithoutCoursesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCoursesInput, UserUncheckedCreateWithoutCoursesInput>
  }

  export type UserUpsertWithoutCoursesInput = {
    update: XOR<UserUpdateWithoutCoursesInput, UserUncheckedUpdateWithoutCoursesInput>
    create: XOR<UserCreateWithoutCoursesInput, UserUncheckedCreateWithoutCoursesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCoursesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCoursesInput, UserUncheckedUpdateWithoutCoursesInput>
  }

  export type UserUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUpdateManyWithoutTeacherNestedInput
    groups?: GroupUpdateManyWithoutTeacherNestedInput
    stages?: AcademicStageUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUncheckedUpdateManyWithoutTeacherNestedInput
    groups?: GroupUncheckedUpdateManyWithoutTeacherNestedInput
    stages?: AcademicStageUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserCreateWithoutGroupsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: ExamCreateNestedManyWithoutTeacherInput
    courses?: CourseCreateNestedManyWithoutTeacherInput
    stages?: AcademicStageCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateWithoutGroupsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: ExamUncheckedCreateNestedManyWithoutTeacherInput
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    stages?: AcademicStageUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserCreateOrConnectWithoutGroupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
  }

  export type UserUpsertWithoutGroupsInput = {
    update: XOR<UserUpdateWithoutGroupsInput, UserUncheckedUpdateWithoutGroupsInput>
    create: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGroupsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGroupsInput, UserUncheckedUpdateWithoutGroupsInput>
  }

  export type UserUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUpdateManyWithoutTeacherNestedInput
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    stages?: AcademicStageUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamUncheckedUpdateManyWithoutTeacherNestedInput
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    stages?: AcademicStageUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserCreateWithoutExamsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groups?: GroupCreateNestedManyWithoutTeacherInput
    courses?: CourseCreateNestedManyWithoutTeacherInput
    stages?: AcademicStageCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateWithoutExamsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    geminiApiKey?: string | null
    geminiModel?: string
    platformName?: string
    teacherTitle?: string
    teacherBio?: string
    teacherExperience?: string
    teacherStudentsCount?: string
    teacherCoursesCount?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    teacherImageUrl?: string
    brandTheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groups?: GroupUncheckedCreateNestedManyWithoutTeacherInput
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    stages?: AcademicStageUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserCreateOrConnectWithoutExamsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExamsInput, UserUncheckedCreateWithoutExamsInput>
  }

  export type QuestionCreateWithoutExamInput = {
    id?: string
    questionNumber: number
    type: string
    questionText: string
    points?: number
    correctOptionId?: string | null
    needsReview?: boolean
    orderIndex?: number
    options?: QuestionOptionCreateNestedManyWithoutQuestionInput
    answers?: StudentAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutExamInput = {
    id?: string
    questionNumber: number
    type: string
    questionText: string
    points?: number
    correctOptionId?: string | null
    needsReview?: boolean
    orderIndex?: number
    options?: QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput
    answers?: StudentAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutExamInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutExamInput, QuestionUncheckedCreateWithoutExamInput>
  }

  export type QuestionCreateManyExamInputEnvelope = {
    data: QuestionCreateManyExamInput | QuestionCreateManyExamInput[]
  }

  export type ExamAttemptCreateWithoutExamInput = {
    id?: string
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
    student?: StudentCreateNestedOneWithoutAttemptsInput
    answers?: StudentAnswerCreateNestedManyWithoutAttemptInput
  }

  export type ExamAttemptUncheckedCreateWithoutExamInput = {
    id?: string
    studentId?: string | null
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
    answers?: StudentAnswerUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type ExamAttemptCreateOrConnectWithoutExamInput = {
    where: ExamAttemptWhereUniqueInput
    create: XOR<ExamAttemptCreateWithoutExamInput, ExamAttemptUncheckedCreateWithoutExamInput>
  }

  export type ExamAttemptCreateManyExamInputEnvelope = {
    data: ExamAttemptCreateManyExamInput | ExamAttemptCreateManyExamInput[]
  }

  export type UserUpsertWithoutExamsInput = {
    update: XOR<UserUpdateWithoutExamsInput, UserUncheckedUpdateWithoutExamsInput>
    create: XOR<UserCreateWithoutExamsInput, UserUncheckedCreateWithoutExamsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExamsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExamsInput, UserUncheckedUpdateWithoutExamsInput>
  }

  export type UserUpdateWithoutExamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: GroupUpdateManyWithoutTeacherNestedInput
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    stages?: AcademicStageUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateWithoutExamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    geminiApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    geminiModel?: StringFieldUpdateOperationsInput | string
    platformName?: StringFieldUpdateOperationsInput | string
    teacherTitle?: StringFieldUpdateOperationsInput | string
    teacherBio?: StringFieldUpdateOperationsInput | string
    teacherExperience?: StringFieldUpdateOperationsInput | string
    teacherStudentsCount?: StringFieldUpdateOperationsInput | string
    teacherCoursesCount?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    teacherImageUrl?: StringFieldUpdateOperationsInput | string
    brandTheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: GroupUncheckedUpdateManyWithoutTeacherNestedInput
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    stages?: AcademicStageUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type QuestionUpsertWithWhereUniqueWithoutExamInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutExamInput, QuestionUncheckedUpdateWithoutExamInput>
    create: XOR<QuestionCreateWithoutExamInput, QuestionUncheckedCreateWithoutExamInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutExamInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutExamInput, QuestionUncheckedUpdateWithoutExamInput>
  }

  export type QuestionUpdateManyWithWhereWithoutExamInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutExamInput>
  }

  export type QuestionScalarWhereInput = {
    AND?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    OR?: QuestionScalarWhereInput[]
    NOT?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    id?: StringFilter<"Question"> | string
    examId?: StringFilter<"Question"> | string
    questionNumber?: IntFilter<"Question"> | number
    type?: StringFilter<"Question"> | string
    questionText?: StringFilter<"Question"> | string
    points?: FloatFilter<"Question"> | number
    correctOptionId?: StringNullableFilter<"Question"> | string | null
    needsReview?: BoolFilter<"Question"> | boolean
    orderIndex?: IntFilter<"Question"> | number
  }

  export type ExamAttemptUpsertWithWhereUniqueWithoutExamInput = {
    where: ExamAttemptWhereUniqueInput
    update: XOR<ExamAttemptUpdateWithoutExamInput, ExamAttemptUncheckedUpdateWithoutExamInput>
    create: XOR<ExamAttemptCreateWithoutExamInput, ExamAttemptUncheckedCreateWithoutExamInput>
  }

  export type ExamAttemptUpdateWithWhereUniqueWithoutExamInput = {
    where: ExamAttemptWhereUniqueInput
    data: XOR<ExamAttemptUpdateWithoutExamInput, ExamAttemptUncheckedUpdateWithoutExamInput>
  }

  export type ExamAttemptUpdateManyWithWhereWithoutExamInput = {
    where: ExamAttemptScalarWhereInput
    data: XOR<ExamAttemptUpdateManyMutationInput, ExamAttemptUncheckedUpdateManyWithoutExamInput>
  }

  export type ExamCreateWithoutQuestionsInput = {
    id?: string
    code: string
    title: string
    description?: string | null
    durationMinutes?: number | null
    status?: string
    allowMultipleAttempts?: boolean
    maxAttempts?: number
    targetStage?: string | null
    targetGroup?: string | null
    targetSemester?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    examType?: string
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: string
    totalPoints?: number
    passingPercentage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: UserCreateNestedOneWithoutExamsInput
    attempts?: ExamAttemptCreateNestedManyWithoutExamInput
  }

  export type ExamUncheckedCreateWithoutQuestionsInput = {
    id?: string
    teacherId: string
    code: string
    title: string
    description?: string | null
    durationMinutes?: number | null
    status?: string
    allowMultipleAttempts?: boolean
    maxAttempts?: number
    targetStage?: string | null
    targetGroup?: string | null
    targetSemester?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    examType?: string
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: string
    totalPoints?: number
    passingPercentage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    attempts?: ExamAttemptUncheckedCreateNestedManyWithoutExamInput
  }

  export type ExamCreateOrConnectWithoutQuestionsInput = {
    where: ExamWhereUniqueInput
    create: XOR<ExamCreateWithoutQuestionsInput, ExamUncheckedCreateWithoutQuestionsInput>
  }

  export type QuestionOptionCreateWithoutQuestionInput = {
    id?: string
    optionKey: string
    text: string
  }

  export type QuestionOptionUncheckedCreateWithoutQuestionInput = {
    id?: string
    optionKey: string
    text: string
  }

  export type QuestionOptionCreateOrConnectWithoutQuestionInput = {
    where: QuestionOptionWhereUniqueInput
    create: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput>
  }

  export type QuestionOptionCreateManyQuestionInputEnvelope = {
    data: QuestionOptionCreateManyQuestionInput | QuestionOptionCreateManyQuestionInput[]
  }

  export type StudentAnswerCreateWithoutQuestionInput = {
    id?: string
    selectedOption?: string | null
    essayAnswer?: string | null
    isCorrect?: boolean | null
    pointsAwarded?: number
    teacherFeedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attempt: ExamAttemptCreateNestedOneWithoutAnswersInput
  }

  export type StudentAnswerUncheckedCreateWithoutQuestionInput = {
    id?: string
    attemptId: string
    selectedOption?: string | null
    essayAnswer?: string | null
    isCorrect?: boolean | null
    pointsAwarded?: number
    teacherFeedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentAnswerCreateOrConnectWithoutQuestionInput = {
    where: StudentAnswerWhereUniqueInput
    create: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type StudentAnswerCreateManyQuestionInputEnvelope = {
    data: StudentAnswerCreateManyQuestionInput | StudentAnswerCreateManyQuestionInput[]
  }

  export type ExamUpsertWithoutQuestionsInput = {
    update: XOR<ExamUpdateWithoutQuestionsInput, ExamUncheckedUpdateWithoutQuestionsInput>
    create: XOR<ExamCreateWithoutQuestionsInput, ExamUncheckedCreateWithoutQuestionsInput>
    where?: ExamWhereInput
  }

  export type ExamUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: ExamWhereInput
    data: XOR<ExamUpdateWithoutQuestionsInput, ExamUncheckedUpdateWithoutQuestionsInput>
  }

  export type ExamUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutExamsNestedInput
    attempts?: ExamAttemptUpdateManyWithoutExamNestedInput
  }

  export type ExamUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: ExamAttemptUncheckedUpdateManyWithoutExamNestedInput
  }

  export type QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput = {
    where: QuestionOptionWhereUniqueInput
    update: XOR<QuestionOptionUpdateWithoutQuestionInput, QuestionOptionUncheckedUpdateWithoutQuestionInput>
    create: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput>
  }

  export type QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput = {
    where: QuestionOptionWhereUniqueInput
    data: XOR<QuestionOptionUpdateWithoutQuestionInput, QuestionOptionUncheckedUpdateWithoutQuestionInput>
  }

  export type QuestionOptionUpdateManyWithWhereWithoutQuestionInput = {
    where: QuestionOptionScalarWhereInput
    data: XOR<QuestionOptionUpdateManyMutationInput, QuestionOptionUncheckedUpdateManyWithoutQuestionInput>
  }

  export type QuestionOptionScalarWhereInput = {
    AND?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
    OR?: QuestionOptionScalarWhereInput[]
    NOT?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
    id?: StringFilter<"QuestionOption"> | string
    questionId?: StringFilter<"QuestionOption"> | string
    optionKey?: StringFilter<"QuestionOption"> | string
    text?: StringFilter<"QuestionOption"> | string
  }

  export type StudentAnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    where: StudentAnswerWhereUniqueInput
    update: XOR<StudentAnswerUpdateWithoutQuestionInput, StudentAnswerUncheckedUpdateWithoutQuestionInput>
    create: XOR<StudentAnswerCreateWithoutQuestionInput, StudentAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type StudentAnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    where: StudentAnswerWhereUniqueInput
    data: XOR<StudentAnswerUpdateWithoutQuestionInput, StudentAnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type StudentAnswerUpdateManyWithWhereWithoutQuestionInput = {
    where: StudentAnswerScalarWhereInput
    data: XOR<StudentAnswerUpdateManyMutationInput, StudentAnswerUncheckedUpdateManyWithoutQuestionInput>
  }

  export type StudentAnswerScalarWhereInput = {
    AND?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
    OR?: StudentAnswerScalarWhereInput[]
    NOT?: StudentAnswerScalarWhereInput | StudentAnswerScalarWhereInput[]
    id?: StringFilter<"StudentAnswer"> | string
    attemptId?: StringFilter<"StudentAnswer"> | string
    questionId?: StringFilter<"StudentAnswer"> | string
    selectedOption?: StringNullableFilter<"StudentAnswer"> | string | null
    essayAnswer?: StringNullableFilter<"StudentAnswer"> | string | null
    isCorrect?: BoolNullableFilter<"StudentAnswer"> | boolean | null
    pointsAwarded?: FloatFilter<"StudentAnswer"> | number
    teacherFeedback?: StringNullableFilter<"StudentAnswer"> | string | null
    createdAt?: DateTimeFilter<"StudentAnswer"> | Date | string
    updatedAt?: DateTimeFilter<"StudentAnswer"> | Date | string
  }

  export type QuestionCreateWithoutOptionsInput = {
    id?: string
    questionNumber: number
    type: string
    questionText: string
    points?: number
    correctOptionId?: string | null
    needsReview?: boolean
    orderIndex?: number
    exam: ExamCreateNestedOneWithoutQuestionsInput
    answers?: StudentAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutOptionsInput = {
    id?: string
    examId: string
    questionNumber: number
    type: string
    questionText: string
    points?: number
    correctOptionId?: string | null
    needsReview?: boolean
    orderIndex?: number
    answers?: StudentAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutOptionsInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
  }

  export type QuestionUpsertWithoutOptionsInput = {
    update: XOR<QuestionUpdateWithoutOptionsInput, QuestionUncheckedUpdateWithoutOptionsInput>
    create: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutOptionsInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutOptionsInput, QuestionUncheckedUpdateWithoutOptionsInput>
  }

  export type QuestionUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    exam?: ExamUpdateOneRequiredWithoutQuestionsNestedInput
    answers?: StudentAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    answers?: StudentAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type ExamCreateWithoutAttemptsInput = {
    id?: string
    code: string
    title: string
    description?: string | null
    durationMinutes?: number | null
    status?: string
    allowMultipleAttempts?: boolean
    maxAttempts?: number
    targetStage?: string | null
    targetGroup?: string | null
    targetSemester?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    examType?: string
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: string
    totalPoints?: number
    passingPercentage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: UserCreateNestedOneWithoutExamsInput
    questions?: QuestionCreateNestedManyWithoutExamInput
  }

  export type ExamUncheckedCreateWithoutAttemptsInput = {
    id?: string
    teacherId: string
    code: string
    title: string
    description?: string | null
    durationMinutes?: number | null
    status?: string
    allowMultipleAttempts?: boolean
    maxAttempts?: number
    targetStage?: string | null
    targetGroup?: string | null
    targetSemester?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    examType?: string
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: string
    totalPoints?: number
    passingPercentage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutExamInput
  }

  export type ExamCreateOrConnectWithoutAttemptsInput = {
    where: ExamWhereUniqueInput
    create: XOR<ExamCreateWithoutAttemptsInput, ExamUncheckedCreateWithoutAttemptsInput>
  }

  export type StudentCreateWithoutAttemptsInput = {
    id?: string
    name: string
    username: string
    email?: string | null
    passwordHash: string
    phone: string
    parentPhone: string
    stage: string
    groupName: string
    semester?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutAttemptsInput = {
    id?: string
    name: string
    username: string
    email?: string | null
    passwordHash: string
    phone: string
    parentPhone: string
    stage: string
    groupName: string
    semester?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutAttemptsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAttemptsInput, StudentUncheckedCreateWithoutAttemptsInput>
  }

  export type StudentAnswerCreateWithoutAttemptInput = {
    id?: string
    selectedOption?: string | null
    essayAnswer?: string | null
    isCorrect?: boolean | null
    pointsAwarded?: number
    teacherFeedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    question: QuestionCreateNestedOneWithoutAnswersInput
  }

  export type StudentAnswerUncheckedCreateWithoutAttemptInput = {
    id?: string
    questionId: string
    selectedOption?: string | null
    essayAnswer?: string | null
    isCorrect?: boolean | null
    pointsAwarded?: number
    teacherFeedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentAnswerCreateOrConnectWithoutAttemptInput = {
    where: StudentAnswerWhereUniqueInput
    create: XOR<StudentAnswerCreateWithoutAttemptInput, StudentAnswerUncheckedCreateWithoutAttemptInput>
  }

  export type StudentAnswerCreateManyAttemptInputEnvelope = {
    data: StudentAnswerCreateManyAttemptInput | StudentAnswerCreateManyAttemptInput[]
  }

  export type ExamUpsertWithoutAttemptsInput = {
    update: XOR<ExamUpdateWithoutAttemptsInput, ExamUncheckedUpdateWithoutAttemptsInput>
    create: XOR<ExamCreateWithoutAttemptsInput, ExamUncheckedCreateWithoutAttemptsInput>
    where?: ExamWhereInput
  }

  export type ExamUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: ExamWhereInput
    data: XOR<ExamUpdateWithoutAttemptsInput, ExamUncheckedUpdateWithoutAttemptsInput>
  }

  export type ExamUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutExamsNestedInput
    questions?: QuestionUpdateManyWithoutExamNestedInput
  }

  export type ExamUncheckedUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutExamNestedInput
  }

  export type StudentUpsertWithoutAttemptsInput = {
    update: XOR<StudentUpdateWithoutAttemptsInput, StudentUncheckedUpdateWithoutAttemptsInput>
    create: XOR<StudentCreateWithoutAttemptsInput, StudentUncheckedCreateWithoutAttemptsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutAttemptsInput, StudentUncheckedUpdateWithoutAttemptsInput>
  }

  export type StudentUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentAnswerUpsertWithWhereUniqueWithoutAttemptInput = {
    where: StudentAnswerWhereUniqueInput
    update: XOR<StudentAnswerUpdateWithoutAttemptInput, StudentAnswerUncheckedUpdateWithoutAttemptInput>
    create: XOR<StudentAnswerCreateWithoutAttemptInput, StudentAnswerUncheckedCreateWithoutAttemptInput>
  }

  export type StudentAnswerUpdateWithWhereUniqueWithoutAttemptInput = {
    where: StudentAnswerWhereUniqueInput
    data: XOR<StudentAnswerUpdateWithoutAttemptInput, StudentAnswerUncheckedUpdateWithoutAttemptInput>
  }

  export type StudentAnswerUpdateManyWithWhereWithoutAttemptInput = {
    where: StudentAnswerScalarWhereInput
    data: XOR<StudentAnswerUpdateManyMutationInput, StudentAnswerUncheckedUpdateManyWithoutAttemptInput>
  }

  export type ExamAttemptCreateWithoutAnswersInput = {
    id?: string
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
    exam: ExamCreateNestedOneWithoutAttemptsInput
    student?: StudentCreateNestedOneWithoutAttemptsInput
  }

  export type ExamAttemptUncheckedCreateWithoutAnswersInput = {
    id?: string
    examId: string
    studentId?: string | null
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
  }

  export type ExamAttemptCreateOrConnectWithoutAnswersInput = {
    where: ExamAttemptWhereUniqueInput
    create: XOR<ExamAttemptCreateWithoutAnswersInput, ExamAttemptUncheckedCreateWithoutAnswersInput>
  }

  export type QuestionCreateWithoutAnswersInput = {
    id?: string
    questionNumber: number
    type: string
    questionText: string
    points?: number
    correctOptionId?: string | null
    needsReview?: boolean
    orderIndex?: number
    exam: ExamCreateNestedOneWithoutQuestionsInput
    options?: QuestionOptionCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutAnswersInput = {
    id?: string
    examId: string
    questionNumber: number
    type: string
    questionText: string
    points?: number
    correctOptionId?: string | null
    needsReview?: boolean
    orderIndex?: number
    options?: QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutAnswersInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
  }

  export type ExamAttemptUpsertWithoutAnswersInput = {
    update: XOR<ExamAttemptUpdateWithoutAnswersInput, ExamAttemptUncheckedUpdateWithoutAnswersInput>
    create: XOR<ExamAttemptCreateWithoutAnswersInput, ExamAttemptUncheckedCreateWithoutAnswersInput>
    where?: ExamAttemptWhereInput
  }

  export type ExamAttemptUpdateToOneWithWhereWithoutAnswersInput = {
    where?: ExamAttemptWhereInput
    data: XOR<ExamAttemptUpdateWithoutAnswersInput, ExamAttemptUncheckedUpdateWithoutAnswersInput>
  }

  export type ExamAttemptUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exam?: ExamUpdateOneRequiredWithoutAttemptsNestedInput
    student?: StudentUpdateOneWithoutAttemptsNestedInput
  }

  export type ExamAttemptUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUpsertWithoutAnswersInput = {
    update: XOR<QuestionUpdateWithoutAnswersInput, QuestionUncheckedUpdateWithoutAnswersInput>
    create: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutAnswersInput, QuestionUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    exam?: ExamUpdateOneRequiredWithoutQuestionsNestedInput
    options?: QuestionOptionUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    options?: QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type ExamCreateManyTeacherInput = {
    id?: string
    code: string
    title: string
    description?: string | null
    durationMinutes?: number | null
    status?: string
    allowMultipleAttempts?: boolean
    maxAttempts?: number
    targetStage?: string | null
    targetGroup?: string | null
    targetSemester?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    examType?: string
    showResultsDirectly?: boolean
    requirePhone?: boolean
    requireGroup?: boolean
    groupsList?: string
    totalPoints?: number
    passingPercentage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupCreateManyTeacherInput = {
    id?: string
    name: string
    stage?: string | null
    createdAt?: Date | string
  }

  export type CourseCreateManyTeacherInput = {
    id?: string
    title: string
    stage: string
    description: string
    badge?: string
    lessonsCount?: number
    duration?: string
    price?: string | null
    themeColor?: string
    isPublished?: boolean
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicStageCreateManyTeacherInput = {
    id?: string
    name: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type ExamUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutExamNestedInput
    attempts?: ExamAttemptUpdateManyWithoutExamNestedInput
  }

  export type ExamUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutExamNestedInput
    attempts?: ExamAttemptUncheckedUpdateManyWithoutExamNestedInput
  }

  export type ExamUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    allowMultipleAttempts?: BoolFieldUpdateOperationsInput | boolean
    maxAttempts?: IntFieldUpdateOperationsInput | number
    targetStage?: NullableStringFieldUpdateOperationsInput | string | null
    targetGroup?: NullableStringFieldUpdateOperationsInput | string | null
    targetSemester?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examType?: StringFieldUpdateOperationsInput | string
    showResultsDirectly?: BoolFieldUpdateOperationsInput | boolean
    requirePhone?: BoolFieldUpdateOperationsInput | boolean
    requireGroup?: BoolFieldUpdateOperationsInput | boolean
    groupsList?: StringFieldUpdateOperationsInput | string
    totalPoints?: FloatFieldUpdateOperationsInput | number
    passingPercentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    badge?: StringFieldUpdateOperationsInput | string
    lessonsCount?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    themeColor?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    badge?: StringFieldUpdateOperationsInput | string
    lessonsCount?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    themeColor?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    stage?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    badge?: StringFieldUpdateOperationsInput | string
    lessonsCount?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    price?: NullableStringFieldUpdateOperationsInput | string | null
    themeColor?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicStageUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicStageUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicStageUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamAttemptCreateManyStudentInput = {
    id?: string
    examId: string
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateManyStudentInput = {
    id?: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ExamAttemptUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exam?: ExamUpdateOneRequiredWithoutAttemptsNestedInput
    answers?: StudentAnswerUpdateManyWithoutAttemptNestedInput
  }

  export type ExamAttemptUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: StudentAnswerUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type ExamAttemptUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateManyExamInput = {
    id?: string
    questionNumber: number
    type: string
    questionText: string
    points?: number
    correctOptionId?: string | null
    needsReview?: boolean
    orderIndex?: number
  }

  export type ExamAttemptCreateManyExamInput = {
    id?: string
    studentId?: string | null
    studentName: string
    studentPhone: string
    studentGroup?: string | null
    extraData?: string | null
    startedAt?: Date | string
    submittedAt?: Date | string | null
    timeSpentSeconds?: number
    status?: string
    isApproved?: boolean
    approvedAt?: Date | string | null
    approvedBy?: string | null
    teacherNotes?: string | null
    mcqScore?: number
    essayScore?: number
    totalScore?: number
    maxScore?: number
    percentage?: number
    isPassed?: boolean
    createdAt?: Date | string
  }

  export type QuestionUpdateWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    options?: QuestionOptionUpdateManyWithoutQuestionNestedInput
    answers?: StudentAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    options?: QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput
    answers?: StudentAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateManyWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    points?: FloatFieldUpdateOperationsInput | number
    correctOptionId?: NullableStringFieldUpdateOperationsInput | string | null
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type ExamAttemptUpdateWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneWithoutAttemptsNestedInput
    answers?: StudentAnswerUpdateManyWithoutAttemptNestedInput
  }

  export type ExamAttemptUncheckedUpdateWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: StudentAnswerUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type ExamAttemptUncheckedUpdateManyWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentGroup?: NullableStringFieldUpdateOperationsInput | string | null
    extraData?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    teacherNotes?: NullableStringFieldUpdateOperationsInput | string | null
    mcqScore?: FloatFieldUpdateOperationsInput | number
    essayScore?: FloatFieldUpdateOperationsInput | number
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isPassed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionOptionCreateManyQuestionInput = {
    id?: string
    optionKey: string
    text: string
  }

  export type StudentAnswerCreateManyQuestionInput = {
    id?: string
    attemptId: string
    selectedOption?: string | null
    essayAnswer?: string | null
    isCorrect?: boolean | null
    pointsAwarded?: number
    teacherFeedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionOptionUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    optionKey?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionOptionUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    optionKey?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionOptionUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    optionKey?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type StudentAnswerUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectedOption?: NullableStringFieldUpdateOperationsInput | string | null
    essayAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isCorrect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    teacherFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempt?: ExamAttemptUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type StudentAnswerUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptId?: StringFieldUpdateOperationsInput | string
    selectedOption?: NullableStringFieldUpdateOperationsInput | string | null
    essayAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isCorrect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    teacherFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAnswerUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptId?: StringFieldUpdateOperationsInput | string
    selectedOption?: NullableStringFieldUpdateOperationsInput | string | null
    essayAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isCorrect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    teacherFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAnswerCreateManyAttemptInput = {
    id?: string
    questionId: string
    selectedOption?: string | null
    essayAnswer?: string | null
    isCorrect?: boolean | null
    pointsAwarded?: number
    teacherFeedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentAnswerUpdateWithoutAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectedOption?: NullableStringFieldUpdateOperationsInput | string | null
    essayAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isCorrect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    teacherFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type StudentAnswerUncheckedUpdateWithoutAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOption?: NullableStringFieldUpdateOperationsInput | string | null
    essayAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isCorrect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    teacherFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAnswerUncheckedUpdateManyWithoutAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOption?: NullableStringFieldUpdateOperationsInput | string | null
    essayAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    isCorrect?: NullableBoolFieldUpdateOperationsInput | boolean | null
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    teacherFeedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentCountOutputTypeDefaultArgs instead
     */
    export type StudentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExamCountOutputTypeDefaultArgs instead
     */
    export type ExamCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExamCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestionCountOutputTypeDefaultArgs instead
     */
    export type QuestionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExamAttemptCountOutputTypeDefaultArgs instead
     */
    export type ExamAttemptCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExamAttemptCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AcademicStageDefaultArgs instead
     */
    export type AcademicStageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AcademicStageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentDefaultArgs instead
     */
    export type StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CourseDefaultArgs instead
     */
    export type CourseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CourseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GroupDefaultArgs instead
     */
    export type GroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GroupDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExamDefaultArgs instead
     */
    export type ExamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExamDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestionDefaultArgs instead
     */
    export type QuestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestionOptionDefaultArgs instead
     */
    export type QuestionOptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestionOptionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExamAttemptDefaultArgs instead
     */
    export type ExamAttemptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExamAttemptDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentAnswerDefaultArgs instead
     */
    export type StudentAnswerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentAnswerDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}