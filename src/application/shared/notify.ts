import { HttpCode } from './http'

abstract class Notify {
  message: string
  code: number

  constructor(message: string, code: number) {
    this.message = message
    this.code = code
  }
}

export class Success extends Notify {
  private constructor(message: string) {
    super(message, HttpCode.SUCCESS)
  }

  static send(message: string) {
    return new Success(message)
  }
}

export class Created extends Notify {
  private constructor(message: string) {
    super(message, HttpCode.CREATED)
  }

  static send(message: string) {
    return new Created(message)
  }
}

export class BadRequest extends Notify {
  private constructor(message: string) {
    super(message, HttpCode.BAD_REQUEST)
  }

  static send(message: string) {
    return new BadRequest(message)
  }
}

export class Unauthorized extends Notify {
  private constructor(message: string) {
    super(message, HttpCode.UNAUTHORIZED)
  }

  static send(message: string) {
    return new Unauthorized(message)
  }
}

export class PaymentRequired extends Notify {
  private constructor(message: string) {
    super(message, HttpCode.PAYMENT_REQUIRED)
  }

  static send(message: string) {
    return new PaymentRequired(message)
  }
}

export class NotFound extends Notify {
  private constructor(message: string) {
    super(message, HttpCode.NOT_FOUND)
  }

  static send(message: string) {
    return new NotFound(message)
  }
}

export class Conflict extends Notify {
  private constructor(message: string) {
    super(message, HttpCode.CONFLICT)
  }

  static send(message: string) {
    return new Conflict(message)
  }
}

export class InternalServer extends Notify {
  private constructor(message: string) {
    super(message, HttpCode.INTERNAL_SERVER)
  }

  static send(message: string) {
    return new InternalServer(message)
  }
}
