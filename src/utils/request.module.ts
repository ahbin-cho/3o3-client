export interface IncomeRequest {
    ok: boolean,
    data: {
         tax: {
             incomes: [
                 {
                     type: string,
                     amount: number
                 }
             ]
         }
    }
 }
 
 export interface officeRequest {
     ok: boolean,
     data: {
         tax: {
             office: {
                 name: string,
                 phone: string
             }
         }
     }
 }

 export interface EasySignRequest {
    ok: boolean,
    error: {
        code: number,
        message: string,
    },
    data: {
        expiredAt:string,
        startedAt:string,
    }
}