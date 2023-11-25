import { Controller, Get, Delete, Put, Body, Req, Post, Param, UseGuards, HttpStatus, Query } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
// import { AppRequest, getUserIdFromRequest } from '../shared';

// import { calculateCartTotal } from './models-rules';
import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  @Get('all')
  async findAllCarts() {
    const cart = await this.cartService.findAll();

    console.log(cart)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: cart,
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Query('userId') userId: string) {
    const cart = await this.cartService.findOrCreateByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: cart,
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  clearUserCart(@Query('userId') userId: string) {
    this.cartService.removeByUserId(userId);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'OK',
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Query('userId') userId: string, @Body() body) { // TODO: validate body payload...
    const cart = await this.cartService.updateByUserId(userId, body)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        // total: calculateCartTotal(cart),
      }
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post()
  async createCart(@Query('userId') userId: string, @Body() body) {
    const cart = await this.cartService.updateByUserId(userId, body)

    return {
      statusCode: HttpStatus.CREATED,
      message: 'OK',
      data: {
        cart,
      }
    }
  }

  @Post('checkout/:userId')
  async checkout(@Param('userId') userId: string) {
    console.log('userId', userId)
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cart is empty',
      }
    }

    const order = await this.orderService.createOrder({
      userId: cart.user_id,
      cartId: cart.id,
      cart,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'OK',
      data: { order }
    }
  }
}
