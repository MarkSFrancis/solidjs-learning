import { Component, createSignal, For } from "solid-js";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Stack,
} from "solid-bootstrap";

const App: Component = () => {
  const [newTodoTitle, setNewTodoTitle] = createSignal("");
  const [todos, setTodos] = createSignal<string[]>([]);

  function addItem(e: Event) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formValues = Object.fromEntries(new FormData(form).entries()) as {
      todo: string;
    };

    setTodos([...todos(), formValues.todo]);
    setNewTodoTitle("");
  }

  return (
    <Container style={{ "padding-top": "2rem", "max-width": "540px" }}>
      <Stack gap={3}>
        <h1 class="display-4">Todo List</h1>
        <ListGroup>
          <For each={todos()}>
            {(item) => (
              <ListGroup.Item>
                <Row>
                  <Col xs="auto">
                    <Form.Check />
                  </Col>
                  <Col>{item}</Col>
                </Row>
              </ListGroup.Item>
            )}
          </For>
        </ListGroup>
        <Form onSubmit={addItem}>
          <Row>
            <Col>
              <Form.Control
                placeholder="New todo"
                name="todo"
                type="text"
                autocomplete="off"
                onChange={(e) => setNewTodoTitle(e.currentTarget.value)}
                value={newTodoTitle()}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Stack>
    </Container>
  );
};

export default App;
