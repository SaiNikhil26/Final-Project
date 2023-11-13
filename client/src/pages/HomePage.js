import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
import heroimg from "../image/hero-img03.png";
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <section className="intro">
        <h3 className="intro-heading">We help patients live a healthy, longer life</h3>
        <img src={heroimg} alt="heroimg" className="heroimg"></img>
        
      </section>
      <section>
        <h2>Our Doctors</h2>
        <p>
          World-class care for everyone. Our health System offers unmatched,
          expert health care.
        </p>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
      </section>
    </Layout>
  );
};

export default HomePage;
