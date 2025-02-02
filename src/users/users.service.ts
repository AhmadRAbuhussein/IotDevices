import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<null> {
    const userExists = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);
    return null;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async onModuleInit() {
    await this.createDefaultUsers();
  }

  private async createDefaultUsers() {
    const defaultUsers: { email: string; password: string; }[] = [
      { email: 'admin@example.com', password: 'admin123' }
    ];

    for (const user of defaultUsers) {
      const existingUser = await this.usersRepository.findOneBy({ email: user.email });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await this.usersRepository.save({
          ...user,
          password: hashedPassword,
        });
      }
    }
  }
}
