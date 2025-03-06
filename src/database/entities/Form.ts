import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { College, FormType } from './Enums'

@Entity({ name: 'forms' })
class Form {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 255 })
  email: string

  @Column({ type: 'varchar' })
  phone: string

  @Column({
    type: 'enum',
    enum: College
  })
  college: College

  @Column({
    type: 'enum',
    enum: FormType,
    default: FormType.UNIVERSITY
  })
  type: FormType

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'double', nullable: true })
  userLatitude: number

  @Column({ type: 'double', nullable: true })
  userLongitude: number

  @Column({ type: 'double', nullable: true })
  collegeLatitude: number

  @Column({ type: 'double', nullable: true })
  collegeLongitude: number

  @Column({ type: 'double', nullable: true })
  userDistanceFromCollege: number

  @Column({ type: 'varchar', nullable: true })
  confirmationToken: string

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean

  @Column({ type: 'boolean', default: false })
  isPhoneVerified: boolean

  @Column({ type: 'number', default: false })
  phoneOtp: number

  @Column({ type: 'varchar', length: 255 })
  address: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Form
