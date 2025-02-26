import { Entity, PrimaryKey, ManyToOne, Property, OneToMany, Collection, type Rel } from '@mikro-orm/core';
import { ProfileEntity } from './ProfileEntity';
import type { CommentEntity } from "$lib/db/entities/CommentEntity";

@Entity()
export class SubmissionEntity {
    @PrimaryKey({type: "number"})
    id!: number;

    @ManyToOne(() => ProfileEntity)
    author!: Rel<ProfileEntity>;

    @Property({type: "date"})
    date!: Date;

    @Property({type: "number"})
    likes: number = 0;

    // @OneToMany({
    //     entity: () => 'CommentEntity',
    //     mappedBy: 'parentSubmission',
    //     lazy: true
    // })
    // comments = new Collection<Rel<CommentEntity>>(this);
}
