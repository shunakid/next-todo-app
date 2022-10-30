import React from "react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "../api/todo";
import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";

const AddTodo = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("保留");
  const [isLoading, setIsLoading] = React.useState(false);
  const { isLoggedIn, user } = useAuth();
  const toast = useToast();

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "ToDoを作成するには、ログインする必要があります。",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const todo = {
      title,
      description,
      status,
      userId: user.uid,
    };

    await addTodo(todo);
    setIsLoading(false);
    setTitle("");
    setDescription("");
    setStatus("保留");
    toast({ title: "Todoが作成されました", status: "success" });
  };

  return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
      <Stack direction="column">
        <Input
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option
            value={"保留"}
            style={{ color: "yellow", fontWeight: "bold" }}
          >
            保留 ⌛
          </option>
          <option value={"完了"} style={{ color: "green", fontWeight: "bold" }}>
            完了 ✅
          </option>
        </Select>
        <Button
          onClick={() => handleTodoCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          colorScheme="teal"
          variant="solid"
        >
          追加
        </Button>
      </Stack>
    </Box>
  );
};
export default AddTodo;
