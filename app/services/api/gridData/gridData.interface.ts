export interface PagedData<TItem>
{
    data: TItem[];
    totalCount: number;
}

export interface GridItem
{
    id: string;
    index: number;
    isActive: boolean;
    balance: string;
    age: number;
    name: string;
    surname: string;
    address: string;
    email: string;
    phone: string;
}