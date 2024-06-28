import { useState, useEffect } from "react";
import { createBook, updateBook } from "@/service/bookService";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Input,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Image,
} from "@chakra-ui/react";

const BookForm = ({ bookData }) => {
  const toast = useToast();
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const formData = new FormData(e.target);
    if (bookData) {
      try {
        await updateBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    try {
      await createBook(formData);
      e.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <form onSubmit={handleSubmit}>
        {error && (
          <Box color="red.500" mb={4}>
            {error}
          </Box>
        )}
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" defaultValue={bookData?.title} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Author</FormLabel>
          <Input type="text" name="author" defaultValue={bookData?.author} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Publisher</FormLabel>
          <Input
            type="text"
            name="publisher"
            defaultValue={bookData?.publisher}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Year</FormLabel>
          <Input name="year" type="number" defaultValue={bookData?.year} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Pages</FormLabel>
          <Input name="pages" type="number" defaultValue={bookData?.pages} />
        </FormControl>

        {selectedImage && (
          <Image w={60} mt="2" src={selectedImage} alt="Selected Image" />
        )}
        {!bookData?.image && (
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(URL.createObjectURL(file));
              }}
            />
          </FormControl>
        )}

        <Button mt={6} colorScheme="teal" type="submit">
          {bookData ? "Edit Book" : "Create Book"}
        </Button>
      </form>
    </Box>
  );
};

export default BookForm;
