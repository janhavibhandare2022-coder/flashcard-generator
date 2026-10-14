import React, { useRef } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addFlashcard } from '../redux/flashcardSlice';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaUpload } from 'react-icons/fa';

const validationSchema = Yup.object().shape({
  groupName: Yup.string().required('Group name is required!'),
  groupDescription: Yup.string().required('Group description is required!'),
  terms: Yup.array().of(
    Yup.object().shape({
      term: Yup.string().required('Term is required!'),
      definition: Yup.string().required('Definition is required!'),
    })
  ).min(1, 'At least one term is required!'),
});

const CreateFlashcard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const termInputRefs = useRef([]);

  const initialValues = {
    groupName: '',
    groupDescription: '',
    groupImage: '',
    terms: [{ term: '', definition: '', termImage: '' }],
  };

  const handleImageUpload = (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue(fieldName, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    const newCard = {
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString(),
      ...values,
    };
    dispatch(addFlashcard(newCard));
    resetForm();
    alert('Flashcard Group Created Successfully!');
    navigate('/my-flashcards');
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 w-full space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Create Group*
                    </label>
                    <Field
                      name="groupName"
                      placeholder="Enter group name (e.g. Web 3)"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
                    />
                    <ErrorMessage name="groupName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Add description*
                    </label>
                    <Field
                      as="textarea"
                      rows="3"
                      name="groupDescription"
                      placeholder="Describe the role, responsibilities, skills..."
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
                    />
                    <ErrorMessage name="groupDescription" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <label className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-blue-600 font-medium cursor-pointer hover:bg-gray-50">
                    <FaUpload /> Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, setFieldValue, 'groupImage')}
                    />
                  </label>
                  {values.groupImage && (
                    <img src={values.groupImage} alt="Group" className="w-16 h-16 rounded object-cover mt-2 border" />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <FieldArray name="terms">
                {({ push, remove }) => (
                  <div className="space-y-6">
                    {values.terms.map((_, index) => (
                      <div key={index} className="flex flex-col md:flex-row gap-4 items-start border-b pb-4">
                        <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold mt-2">
                          {index + 1}
                        </span>

                        <div className="flex-1 w-full">
                          <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Enter Term*
                          </label>
                          <Field
                            name={`terms.${index}.term`}
                            placeholder="Enter term title"
                            innerRef={(el) => (termInputRefs.current[index] = el)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                          />
                          <ErrorMessage name={`terms.${index}.term`} component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className="flex-[2] w-full">
                          <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Enter Definition*
                          </label>
                          <Field
                            as="textarea"
                            rows="2"
                            name={`terms.${index}.definition`}
                            placeholder="Enter term definition"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                          />
                          <ErrorMessage name={`terms.${index}.definition`} component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className="flex flex-col items-center">
                          <label className="border border-blue-500 text-blue-500 text-xs px-3 py-2 rounded cursor-pointer hover:bg-blue-50 mt-5">
                            Select Image
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, setFieldValue, `terms.${index}.termImage`)}
                            />
                          </label>
                          {values.terms[index].termImage && (
                            <img src={values.terms[index].termImage} alt="Term" className="w-10 h-10 object-cover mt-1 rounded border" />
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-gray-500 mt-6">
                          <button
                            type="button"
                            title="Edit"
                            onClick={() => termInputRefs.current[index]?.focus()}
                            className="hover:text-blue-600"
                          >
                            <FaEdit />
                          </button>
                          {values.terms.length > 1 && (
                            <button
                              type="button"
                              title="Delete"
                              onClick={() => remove(index)}
                              className="hover:text-red-600"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => push({ term: '', definition: '', termImage: '' })}
                      className="text-blue-600 font-semibold text-sm hover:underline"
                    >
                      + Add more
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-10 py-2 rounded shadow transition-all"
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateFlashcard;