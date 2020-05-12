import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Contact from './contact.entity';
import { IdentificationCategory } from '../enums/identificationCategory';

@Entity()
export default class Identification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  cardNumber?: string;

  @Column()
  issuingCountry: string;

  @Column()
  startDate: Date;

  @Column()
  expiryDate: Date;

  @Column({
    type: 'enum',
    enum: IdentificationCategory,
    nullable: false,
    default: IdentificationCategory.Nin,
  })
  category: IdentificationCategory;

  @Column()
  isPrimary: boolean;

  @JoinColumn()
  @ManyToOne(
    type => Contact,
    it => it.identifications,
    { nullable: false, cascade: ['insert', 'remove'] },
  )
  contact: Contact;

  @Column()
  contactId: number;
}
