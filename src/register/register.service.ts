import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
  public data: any[] = [
    {
      name: 'Mustafa',
      age: 21,
      id: 1,
    },
    {
      name: 'yousef',
      age: 32,
      id: 2,
    },
    {
      name: 'Esia',
      age: 53,
      id: 3,
    },
    {
      name: 'mahmoud',
      age: 21,
      id: 4,
    },
  ];

  findAll() {
    return this.data;
  }
  findOne(id: string) {
    return this.data.find((el: { id: number }) => el.id === +id);
  }
}
