export class Image {
    createdAt: Date;
    id: string;
    label: string;
    originalLabel: string;
    url: string;
    userId: string;
    editMode: boolean = false;
    updateSuccessAlert: boolean = false;
}