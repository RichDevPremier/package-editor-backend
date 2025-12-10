import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Repository, Not, IsNull } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getStats() {
    const totalModels = await this.productRepository.count();
    const activeConfigurations = await this.productRepository.count({
      where: { configUrl: Not(IsNull()) },
    });

    // Placeholder for pending approvals as it's not implemented yet
    const pendingApprovals = 5; // Mock data from template

    return {
      totalModels,
      activeConfigurations,
      pendingApprovals,
    };
  }

  async getRecentActivity() {
    // Placeholder for recent activity as it's not implemented yet
    return [
      {
        action: 'Model Updated',
        modelName: 'Aeron Chair',
        user: 'Emily Carter',
        dateTime: '2 hours ago',
      },
      {
        action: 'New Configuration',
        modelName: 'ErgoPro Desk',
        user: 'David Lee',
        dateTime: '5 hours ago',
      },
      {
        action: 'Model Approved',
        modelName: 'Standing Desk Converter',
        user: 'John Doe',
        dateTime: 'Yesterday',
      },
      {
        action: 'New Model Added',
        modelName: 'Monitor Arm X1',
        user: 'Sophia Chen',
        dateTime: '2 days ago',
      },
      {
        action: 'Settings Changed',
        modelName: '-',
        user: 'John Doe',
        dateTime: '3 days ago',
      },
    ];
  }

  async getDashboardData() {
    const stats = await this.getStats();
    const recentActivity = await this.getRecentActivity();
    return {
      stats,
      recentActivity,
    };
  }
}
