import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Logout, saveForm } from "../AuthFunctions/authFunctions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PDPA from "../PDPA/PDPA";

const Schema = Yup.object().shape({
  firstName: Yup.string().required("กรุณากรอกชื่อ"),
  lastName: Yup.string().required("กรุณากรอกนามสกุล"),
  nickName: Yup.string().required("กรุณากรอกชื่อเล่น"),
  phoneNumber: Yup.string()
    .min(10)
    .required("กรุณากรอกเบอร์โทรให้ครบ 10 ตัว")
    .max(10)
    .required("กรุณากรอกเบอร์โทรไม่เกิน 10 ตัว"),
  address: Yup.string().required("กรุณากรอกที่อยู่"),
  size: Yup.string().required("กรุณาเลือกไซต์เสื้อ"),
  organization: Yup.string().required("กรุณากรอกชื่อองค์กร หรือ หน่วยงาน"),
  allergic: Yup.string().required("กรุณากรอกอาหารที่แพ้ หากไม่มีให้ใส่ - "),
});

function FormPage() {
  const userload = useLoaderData();
  const [pdpa, setPdpa] = useState(userload.user.pdpa || !userload.editable);
  const [pdpaPopUp, setPdpaPopUp] = useState(true);

  const pdpaConfirm = async () => {
    let pdpa_data = {
      email: userload.infomation.emails[0].value,
      pdpa: true,
    };
    let res = await saveForm(pdpa_data);
    console.log(res);
    if (!res.error) {
      setPdpaPopUp(false);
    }
  };

  const closePDPA = () => {
    setPdpaPopUp(false);
  };

  const [initValue, setInitValue] = useState({
    firstName: userload.user.firstName,
    lastName: userload.user.lastName,
    nickName: userload.user.nickName,
    phoneNumber: userload.user.phoneNumber,
    address: userload.user.address,
    size: userload.user.size,
    organization: userload.user.organization,
    isHalal: userload.user.isHalal,
    allergic: userload.user.allergic,
  });

  const [formList, setFormList] = useState([
    {
      name: "firstName",
      label: "ชื่อ",
      type: "input",
    },
    {
      name: "lastName",
      label: "นามสกุล",
      type: "input",
    },
    {
      name: "nickName",
      label: "ชื่อเล่น",
      type: "input",
    },
    {
      name: "phoneNumber",
      label: "เบอร์โทร",
      type: "input",
    },
    {
      name: "address",
      label: "ที่อยู่",
      type: "input",
    },
    {
      name: "size",
      label: "ไซต์เสื้อ",
      type: "option",
      options: ["S", "L", "XL"],
    },
    {
      name: "organization",
      label: "องค์กร/หน่วยงาน",
      type: "input",
    },
    {
      name: "isHalal",
      label: "ฮาลาส",
      type: "checkbox",
    },
    {
      name: "allergic",
      label: "อาหารที่แพ้",
      type: "input",
    },
  ]);

  const onSubmitFrom = async (data) => {
    let new_data = data;
    new_data["email"] = userload.infomation.emails[0].value;
    let res = await saveForm(new_data);

    //PDPA
    if (res.error) {
      setPdpaPopUp(true);
      return;
    }

    console.log(res);
  };

  return (
    <div className="container mx-auto">
      {!pdpa && pdpaPopUp ? (
        <PDPA confirm={pdpaConfirm} close={closePDPA} />
      ) : (
        ""
      )}
      <Formik
        validationSchema={Schema}
        initialValues={initValue}
        onSubmit={(values) => {
          onSubmitFrom(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {formList.map((data, i) => {
              if (data.type === "input") {
                return (
                  <div key={i}>
                    <p>{data.label}</p>
                    <Field
                      disabled={!userload.editable}
                      className="p-2 bg-gray-100"
                      name={data.name}
                    />
                    {errors[data.name] && touched[data.name] ? (
                      <p>{errors[data.name]}</p>
                    ) : null}
                  </div>
                );
              }

              if (data.type === "checkbox") {
                return (
                  <div key={i}>
                    <p>{data.label}</p>
                    <Field
                      disabled={!userload.editable}
                      className="p-2 bg-gray-100"
                      name={data.name}
                      type="checkbox"
                    />
                  </div>
                );
              }

              if (data.type === "option") {
                return (
                  <div key={i}>
                    <p>{data.label}</p>
                    <Field
                      disabled={!userload.editable}
                      className="p-2 bg-gray-100"
                      name={data.name}
                      as="select"
                    >
                      {data.options.map((option, i) => (
                        <option value={option} key={i}>
                          {option}
                        </option>
                      ))}
                    </Field>
                  </div>
                );
              }
            })}
            {userload.editable ? (
              <button className="text-white bg-blue-500 px-4 p-2" type="submit">
                Save
              </button>
            ) : null}
          </Form>
        )}
      </Formik>
      <button onClick={Logout}>Logout</button>
    </div>
  );
}

export default FormPage;
