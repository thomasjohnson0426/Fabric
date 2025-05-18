import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  // Create a new document
  async create(createDto: Partial<T>): Promise<T> {
    const document = new this.model(createDto);
    return document.save();
  }

  // Find all documents matching a filter
  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  // Find one document by ID
  async findOneById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  // Find one document by custom filter
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  // Update a document by ID
  async updateById(id: string, updateDto: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  // Delete a document by ID
  async deleteById(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result ? true : false;
  }

  // Delete documents by filter
  async deleteMany(filter: FilterQuery<T>): Promise<number> {
    const result = await this.model.deleteMany(filter).exec();
    return result.deletedCount || 0;
  }
}
