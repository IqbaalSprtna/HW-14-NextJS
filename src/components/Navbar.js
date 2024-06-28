import {
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "@/context/authContext";

const Navbar = () => {
  const { isLogin, logout } = useAuth();

  return (
    <Flex className="navbar">
      <Breadcrumb>
        <BreadcrumbItem className="logo">
          <Link href="/">My Books</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex alignItems="center">
        {isLogin && (
          <Link href="/books/newbook">
            <Button colorScheme="blackAlpha" marginRight="4">
              Create New Book
            </Button>
          </Link>
        )}
        {!isLogin ? (
          <>
            <Link href="/login" marginRight="4">
              <Button colorScheme="blue">Login</Button>
            </Link>
            <Link href="/register">
              <Button colorScheme="blue">Register</Button>
            </Link>
          </>
        ) : (
          <Button
            colorScheme="blue"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
