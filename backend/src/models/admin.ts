@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ unique: true }) email: string;
    @Column() passwordHash: string;
    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;
}