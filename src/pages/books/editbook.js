import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookForm from "@/components/BookForm";
import { getBookById } from "@/service/bookService";

const EditBook = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const response = await getBookById(id);
          setBook(response.book);
        } catch (e) {
          console.log(e);
        }
      };
      fetchBook();
    }
  }, [id]);

  return (
    <Box>
      <BookForm bookData={book} />
    </Box>
  );
};

export default EditBook;
