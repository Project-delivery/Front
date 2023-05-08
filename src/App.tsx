import React, {useState} from 'react'
import Role from "./components/Role/Role";
import Region from "./components/region/region";
import District from "./components/district/district";
import {mainObject} from "./MainObject/main_obj";
import Login from "./components/login/login";
import Password from "./components/password/password";

function App() {

    // Состояния, определеяющие, открыт ли выпадающий список для того или иного поля
    const [openRegion, setOpenRegion] = useState(false)

    const [openDistrict, setOpenDistrict] = useState(false)

    const [openRole, setOpenRole] = useState(false)

    // Состояния, определяющие, разблокировать то или иное поле или нет( сделано таким образом что поле разблокируется только при наличии информации в предыдущем)
    const [field2Disabled, setField2Disabled] = useState(true)

    const [field3Disabled, setField3Disabled] = useState(true)

    const [fields4and5Disabled, setFields4and5Disabled] = useState(true)

    const [valid_password, setValid_password] = useState(false)

    const [valid_login, setValid_Login] = useState(false)

    // Вместо простого alert, здесь должна быть функция отправки формы на бэк
    const handleSubmit = () => {
        alert(JSON.stringify(mainObject))
        console.log(JSON.stringify(mainObject))
    }

    // Определяет наличие валидных данных в логине и пароле, позволяя разблоикровать кнопку для отправки формы
    function isValid(input_1: boolean, input_2: boolean){
        if(input_1 && input_2){
            return true;
        }
        else {
            return false
        }
    }

  return(
      <form onSubmit={(event) => {
          event.preventDefault();
        }
      }>
          <div onClick={() => {        // При нажатии на задний фон, выпадающие списки закрываются
              setOpenRegion(false)
              setOpenDistrict(false)
              setOpenRole(false)
          }}  className="background"
          />
          <div className="window">
              <Role open={openRole} setOpen={setOpenRole} setField2Disabled={setField2Disabled}/>
              <Region open={openRegion} setOpen={setOpenRegion} field2Disabled={field2Disabled} setField3Disabled={setField3Disabled}/>
              <District open={openDistrict} setOpen={setOpenDistrict} field3Disabled={field3Disabled} setField4and5Disabled={setFields4and5Disabled}/>
              <Login field4and5Disabled={fields4and5Disabled} setValid={setValid_Login} />
              <Password field4and5Disabled={fields4and5Disabled} setValid={setValid_password} />
              <button
                  disabled={!isValid(valid_password, valid_login)}
                  className="button_submit"
                  onClick={() => handleSubmit()}
              >
                  Готово
              </button>
          </div>
      </form>
  )
}
export default App;