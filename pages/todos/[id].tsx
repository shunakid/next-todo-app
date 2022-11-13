import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";

export default function showTodo() {
  const router = useRouter();
  const [todo, setTodo]: any = useState([]);

  useEffect(() => {
    //firestoreからそのユーザーのtodoを一件取得
    const todoData = doc(db, "todo", `${router.query.id}`);
    getDoc(todoData).then((documentSnapshot) => {
      setTodo(documentSnapshot.data());
    });
  }, [todo, router.query.id]);

  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        <Box
          p={3}
          boxShadow="2xl"
          shadow={"dark-lg"}
          transition="0.2s"
          _hover={{ boxShadow: "sm" }}
        >
          <Heading as="h3" fontSize={"xl"}>
            {todo.title}
          </Heading>
          <Text>{todo.description}</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
