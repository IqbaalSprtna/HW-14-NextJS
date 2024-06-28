import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { getBookById, deleteBook } from "@/service/bookService";
import { Link } from "@chakra-ui/next-js";

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const data = await getBookById(id);
          setBook(data.book);
        } catch (error) {
          console.error("Failed to fetch book:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBook();
    }
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <Skeleton height="300px" my="6" />;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <Box>
      <Flex my="6" mx="5">
        <Box w="300px">
          <Image src={`http://localhost:8000/${book.image}`} alt={book.title} />
        </Box>
        <Box ml="8">
          <Heading as="h1" size="lg">
            {book.title}
          </Heading>
          <Text fontSize="xl" fontWeight="semibold" color="gray.500">
            {book.author}
          </Text>
          <Text fontSize="xl" fontWeight="semibold" color="gray.500">
            {book.publisher}
          </Text>
          <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb="4">
            {book.year} | {book.pages} pages
          </Text>
        </Box>
      </Flex>

      {localStorage.getItem("token") && (
        <HStack mx="5">
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red">Delete</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to delete this book?
              </PopoverBody>
              <Button onClick={handleDeleteBook} colorScheme="red">
                Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Link href={`/books/editbook/${id}`}>
            <Button colorScheme="blue">Edit</Button>
          </Link>
        </HStack>
      )}
    </Box>
  );
};

export default BookDetail;
