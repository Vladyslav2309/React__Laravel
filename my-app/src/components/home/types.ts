export  interface ICategoryItem{
    id: number,
    name: string,
    image: string,
    description: string
}

export  interface ICategoryResponse{
    data: Array<ICategoryItem>,
    current_page: number, //поточна сторінка
    total:number,  //кількість усіх записів
    last_page:number //кількість усіх сторінок
}
export interface ICategorySearch{
    page?: number | string | null
}