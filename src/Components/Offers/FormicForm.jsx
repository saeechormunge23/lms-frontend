import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../Styles/Form.css";

const schema = Yup.object().shape({
  tier_id: Yup.string().required("Tier ID is required"),
  offerTitle: Yup.string().required("Offer title is required"),
  offerDescription: Yup.string().required("Offer description is required"),
  image: Yup.mixed().required("Image is required"),
  benefit: Yup.number().required("Benefit is required"),
  status: Yup.boolean().required("Status is required"),
});

const FormikForm = () => {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      const imageType = values.image.type;
      const base64Image = imageData.split(",")[1];

      // Get the existing offers from local storage
      const existingOffers = localStorage.getItem("offers");
      const offers = existingOffers ? JSON.parse(existingOffers) : [];

      // Add the new offer to the list
      offers.push({
        ...values,
        image: {
          type: imageType,
          base64: base64Image,
        },
      });

      // Save the updated list to local storage
      localStorage.setItem("offers", JSON.stringify(offers));

      // Navigate back to the offers page
      navigate("/offers");
    };
    reader.readAsDataURL(values.image);
  };

  return (
    <Formik
      initialValues={{
        tier_id: "",
        offerTitle: "",
        offerDescription: "",
        image: "",
        benefit: 0,
        status: false,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="modal-form">
          <h2 className="modal-heading">Add Offer</h2>
          <div className="modal-form-group">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Tier ID:</label>
              <Field type="text" name="tier_id" className="modal-form-input" />
            </div>
            <ErrorMessage
              name="tier_id"
              component="div"
              className="modal-form-error"
            />
          </div>
          <div className="modal-form-group">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Offer Title:</label>
              <Field
                type="text"
                name="offerTitle"
                className="modal-form-input"
              />
            </div>
            <ErrorMessage
              name="offerTitle"
              component="div"
              className="modal-form-error"
            />
          </div>
          <div className="modal-form-group">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Offer Description:</label>
              <Field
                type="text"
                name="offerDescription"
                className="modal-form-input"
              />
            </div>
            <ErrorMessage
              name="offerDescription"
              component="div"
              className="modal-form-error"
            />
          </div>
          <div className="modal-form-group">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Image:</label>
              <input
                type="file"
                name="image"
                accept=".jpg, .png"
                onChange={(event) =>
                  setFieldValue("image", event.target.files[0])
                }
              />
            </div>
            <ErrorMessage
              name="imageUrl"
              component="div"
              className="modal-form-error"
            />
          </div>
          <div className="modal-form-group">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Benefit:</label>
              <Field
                type="number"
                name="benefit"
                className="modal-form-input"
              />
            </div>
            <ErrorMessage
              name="benefit"
              component="div"
              className="modal-form-error"
            />
          </div>
          <div className="modal-form-group status">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Status:</label>
              <Field
                type="checkbox"
                name="status"
                className="modal-form-input status"
              />
            </div>
            <ErrorMessage
              name="status"
              component="div"
              className="modal-form-error"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="modal-submit-btn"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
