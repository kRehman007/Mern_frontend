import React, { useRef, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { MdDeleteSweep } from "react-icons/md";
import { useAddCourseMutation } from "../../Redux/API/courseAPI";
import Nav from "../Home/Nav";
import Footer from "../Home/Footer";
import Toast from "../Toast";

const schema = z.object({
  name: z.string().nonempty("Instructor Name is required"),
  bio: z.string().nonempty("Instructor Bio is required"),
  title: z.string().nonempty("Course Title is required"),
  subtitle: z.string().nonempty("Subtitle is required"),
  desc: z.string().nonempty("Course description is required"),
  price: z.string().nonempty("Price is required"),
  category: z.string().nonempty("Course category is required"),
  highlights: z
    .array(z.string().nonempty("Highlight is required"))
    .min(1, "At least 1 highlight is required"),
  faqs: z
    .array(
      z.object({
        question: z.string().nonempty("Question is required"),
        answer: z.string().nonempty("Answer is required"),
      })
    )
    .min(1, "At least 1 FAQ is required"),
  file: z
    .any()
    .refine((file) => !file?.length, "File is required")
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024,
      "File size must not exceed  5MB"
    ),
});

const Pannel = () => {
  const [addCourse] = useAddCourseMutation();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      highlights: [""],
      faqs: [{ question: "", answer: "" }],
      file: null,
    },
  });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: "highlights",
  });

  const {
    fields: faqFields,
    append: appendFAQ,
    remove: removeFAQ,
  } = useFieldArray({
    control,
    name: "faqs",
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("bio", data.bio);
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("price", data.price);
      formData.append("description", data.desc);
      formData.append("category", data.category);
      formData.append("faqs", JSON.stringify(data.faqs));
      formData.append("highlights", JSON.stringify(data.highlights));
      data.file && formData.append("image", data.file);

      const response = await addCourse(formData).unwrap();
      setMessage(response?.message);

      setValue("name", "");
      setValue("bio", "");
      setValue("title", "");
      setValue("subtitle", ""), setValue("price", "");
      setValue("desc", "");
      setValue("category", "");
      setValue("highlights", [""]);
      setValue("faqs", [{ question: "", answer: "" }]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setMessage(error.data.message);
    }
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <>
      <Nav />
      <Container sx={{ mt: 5 }}>
        {message && <Toast value={message} />}

        <Typography
          variant="h4"
          className="font-montserrat"
          sx={{ color: "#673ab7", textAlign: "center" }}
        >
          Add New Course
        </Typography>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <TextField
            label="Instructor Name"
            size="small"
            type="text"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="Instructor Bio"
            size="small"
            type="text"
            error={!!errors.bio}
            helperText={errors.bio?.message}
            {...register("bio")}
          />
          <TextField
            label="Course Title"
            size="small"
            type="text"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register("title")}
          />

          <TextField
            label="Course Subtitle"
            size="small"
            type="text"
            error={!!errors.subtitle}
            helperText={errors.subtitle?.message}
            {...register("subtitle")}
          />
          <TextField
            label="Course Price"
            placeholder="must be in number"
            size="small"
            type="text"
            error={!!errors.price}
            helperText={errors.price?.message}
            {...register("price")}
          />
          <TextField
            label="Course Description"
            multiline
            rows={4}
            error={!!errors.desc}
            helperText={errors.desc?.message}
            {...register("desc")}
          />
          <TextField
            label="Course Category"
            placeholder="e.g Web Development"
            size="small"
            type="text"
            error={!!errors.category}
            helperText={errors.category?.message}
            {...register("category")}
          />
          <TextField
            inputRef={fileInputRef}
            type="file"
            name="image"
            error={!!errors.file}
            helperText={errors.file?.message}
            onChange={(e) => setValue("file", e.target.files[0])}
          />

          <div className="flex flex-col gap-3">
            <Typography variant="h6" sx={{ color: "#e913b7" }}>
              Add Course Highlights
            </Typography>
            {highlightFields.map((field, index) => (
              <div
                key={field.id}
                className="flex justify-between gap-2 items-center"
              >
                <TextField
                  label={`Highlight ${index + 1}`}
                  size="small"
                  error={!!errors.highlights?.[index]}
                  helperText={errors.highlights?.[index]?.message}
                  {...register(`highlights.${index}`)}
                  className="flex-1"
                />
                <MdDeleteSweep
                  className="text-3xl cursor-pointer"
                  onClick={() => removeHighlight(index)}
                />
              </div>
            ))}
            <Button
              sx={{ background: "#673ab7", color: "#fff" }}
              onClick={() => appendHighlight("")}
            >
              Add Highlight
            </Button>
          </div>
          {errors.highlights && !highlightFields.length && (
            <span className="text-red-600">{errors.highlights.message}</span>
          )}
          <div className="flex flex-col gap-2">
            <Typography variant="h6" sx={{ color: "#e913b7" }}>
              Add FAQs
            </Typography>
            {faqFields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-2">
                <TextField
                  label={`Question ${index + 1}`}
                  size="small"
                  error={!!errors.faqs?.[index]?.question}
                  helperText={errors.faqs?.[index]?.question?.message}
                  {...register(`faqs.${index}.question`)}
                />
                <TextField
                  label={`Answer ${index + 1}`}
                  size="small"
                  error={!!errors.faqs?.[index]?.answer}
                  helperText={errors.faqs?.[index]?.answer?.message}
                  {...register(`faqs.${index}.answer`)}
                />
                <MdDeleteSweep
                  className="text-3xl cursor-pointer"
                  onClick={() => removeFAQ(index)}
                />
              </div>
            ))}
            <Button
              sx={{ background: "#673ab7", color: "#fff" }}
              onClick={() => appendFAQ({ question: "", answer: "" })}
            >
              Add FAQ
            </Button>
          </div>
          {errors.faqs && (
            <span className="text-red-600">{errors.faqs.message}</span>
          )}
          <br />
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-max"
            sx={{
              background: "#e91367",
              textTransform: "capitalize",
              mt: { xs: "-45px", sm: 0 },
              color: "#fff",
              padding: "7px 24px",
              "&:hover": {
                transform: "scale(1.04)",
              },
            }}
          >
            {isSubmitting ? (
              <CircularProgress color="secondary" size="25px" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default Pannel;
