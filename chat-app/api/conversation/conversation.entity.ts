@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("simple-array")
  participants: string[]; // ex: ['user1', 'user2']
}
