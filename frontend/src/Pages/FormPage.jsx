import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { saveForm } from "../AuthFunctions/authFunctions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PDPA from "../PDPA/PDPA";
import { useNavigate } from "react-router-dom";
import AppBar from "../Components/AppBar";
import Swal from "sweetalert2";

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
  speakingTopic: Yup.string().required("กรุณากรอกหัวข้อที่จะนำเสนอ"),
  allergic: Yup.string().required("กรุณากรอกอาหารที่แพ้ หากไม่มีให้ใส่ - "),
});

function FormPage() {
  const userload = useLoaderData();
  const [pdpa, setPdpa] = useState(userload.user.pdpa || !userload.editable);
  const [pdpaPopUp, setPdpaPopUp] = useState(true);
  const navigate = useNavigate();

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
    speakingTopic: userload.user.speakingTopic,
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
      name: "speakingTopic",
      label: "หัวข้อที่จะนำเสนอ",
      type: "input",
    },
    {
      name: "isHalal",
      label: "อาหารฮาลาล",
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

    Swal.fire({
      title: "แจ้งเตือน",
      text: " บันทึกข้อมูลสำเร็จ",
      icon: "success",
      confirmButtonText: "รับทราบ",
      confirmButtonColor: "#FF8C00"
    }).then(() => navigate("/profile"));
  };

  return (
    <React.Fragment>
      <AppBar />
      <div className="container mx-auto max-w-xl">
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
            <Form className="p-4 w-full mx-auto flex flex-col space-y-3 shadow-md pt-24 pb-14">
              {formList.map((data, i) => {
                if (data.type === "input") {
                  return (
                    <div key={i}>
                      <p className="mb-4">{data.label}</p>
                      <Field
                        disabled={
                          !(
                            userload.editable &&
                            userload.user.status === "PENDING"
                          )
                        }
                        className="p-2 bg-gray-100 w-full rounded-lg outline-none"
                        name={data.name}
                        placeholder={"กรุณากรอก " + data.label}
                      />
                      {errors[data.name] && touched[data.name] ? (
                        <p className="text-red-500 text-sm mt-2">
                          {errors[data.name]}
                        </p>
                      ) : null}
                    </div>
                  );
                }

                if (data.type === "checkbox") {
                  return (
                    <div key={i} className="flex items-center space-x-4">
                      <Field
                        id={data.label}
                        disabled={
                          !(
                            userload.editable &&
                            userload.user.status === "PENDING"
                          )
                        }
                        className="p-2 w-4 h-4"
                        name={data.name}
                        type="checkbox"
                      />
                      <label htmlFor={data.label}>{data.label}</label>
                    </div>
                  );
                }

                if (data.type === "option") {
                  return (
                    <div key={i}>
                      <p className="mb-4">{data.label}</p>
                      <Field
                        disabled={
                          !(
                            userload.editable &&
                            userload.user.status === "PENDING"
                          )
                        }
                        className="p-2 bg-gray-100 w-full outline-none"
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
              {userload.editable && userload.user.status === "PENDING" ? (
                <button
                  className="text-white bg-primary-500 px-4 p-2 w-full rounded-lg"
                  type="submit"
                >
                  บันทึกข้อมูล
                </button>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default FormPage;
