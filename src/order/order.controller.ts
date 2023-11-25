import { Controller, Get, Delete, Param, HttpStatus, Query } from '@nestjs/common';

import { OrderService } from './services';

@Controller('api/orders')
export class OrderController {
  constructor(
    private orderService: OrderService
  ) { }

  @Get()
  async findAllOrders() {
    const cart = await this.orderService.findAll();

    console.log(cart)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: cart,
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const cart = await this.orderService.findById(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: cart,
    }
  }

  @Get()
  async findUserCart(@Query('userId') userId: string) {
    const orders = await this.orderService.findByUser(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: orders,
    }
  }

  @Delete(':id')
  clearUserOrder(@Param('id') id: string) {
    this.orderService.removeById(id);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'OK',
    }
  }


  // @Put()
  // async updateById(@Query('orderId') orderId: string, @Body() body) { // TODO: validate body payload...
  //   const cart = await this.orderService.updateById(orderId, body)

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //     data: {
  //       cart,
  //     }
  //   }
  // }
}
