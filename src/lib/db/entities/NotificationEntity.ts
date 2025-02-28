import { Entity, Enum, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ProfileEntity } from './ProfileEntity';
import {NotificationType} from "$lib/models/Notification";

@Entity()
export class NotificationEntity {
    @PrimaryKey({type: "number"})
    id!: number;

    @ManyToOne(() => ProfileEntity, { nullable: false })
    profile!: ProfileEntity;

    @Enum(() => NotificationType)
    type!: NotificationType;

    @Property({ type: 'text', nullable: true })
    body?: string;

    @Property({ type: 'timestamp', nullable: false})
    date: Date;

    @Property({ type: 'boolean', default: false })
    read: boolean = false;
}
