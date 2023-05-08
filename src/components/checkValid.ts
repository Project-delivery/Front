// Функция для проверки введенной строки на наличие запрещенных символов, при их наличии возвращает сообщение об ошибке
export function banSymbols (input: string){

    let banned_symbols = ["/", "&", "?", "\\", "|", " ", "*"]

    for(let i = 0; i < input.length; ++i) {

        for(let j = 0; j < banned_symbols.length; ++j){

            if(input[i] == banned_symbols[j]){

                return 'Поле не должно содержаться следующие символы: "/", "&", "?", "\\\", "|", " ", "*"'

            }
        }

    }
}