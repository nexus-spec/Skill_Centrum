import { Applicant } from 'src/applicants/applicant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

@Entity('educations')
export class Education {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    school: string;

    @Column()
    degree: string;

    @Column({ name: 'fieldOfStudy' })
    fieldOfStudy: string;

    @Column({ type: 'date', name: 'startDate' })
    startDate: Date;

    @Column({ type: 'date', nullable: true, name: 'endDate' })
    endDate: Date;

    @Column({ default: false })
    present: boolean;

    @ManyToOne(() => Applicant, (applicant) => applicant.educations, { 
        onDelete: 'CASCADE',
        eager: true // 👈 Add this to automatically load the relation
    })
    @JoinColumn({ name: 'applicantId' })
    applicant: Applicant; // 👈 This should be the relation property

    @Column({ name: 'applicantId' })
    applicantId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}