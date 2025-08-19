import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('applicants')
export class Applicant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  surname: string;

  @Column({ length: 100 })
  firstname: string;

  @Column({ name: 'app_no', unique: true, length: 255 })
  applicationNumber: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'department_id', default: 81 })
  departmentId: number;

  @Column({ default: 1 })
  stage: number;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 255, nullable: true })
  course: string;

  @Column({ length: 50, nullable: true })
  cohort: string;

  @Column({ length: 50, nullable: true })
  session: string;

  @Column({ length: 50, nullable: true })
  phone: string;


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}