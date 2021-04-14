import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import gql from "graphql-tag";
import { Exercise, Set } from "lib/graphql/createExercise.graphql";
import { useDeleteSetMutation } from "lib/graphql/deleteSet.graphql";
import { useUpdateSetMutation } from "lib/graphql/updateSet.graphql";
import { useEffect, useState } from "react";

export const READ_WORKOUT_QUERY = gql`
  query ReadWorkouts {
    readWorkouts {
      _id
      name
      datum
      athlete {
        _id
        email
        username
      }
      exercise {
        _id
        name
        category
        set {
          wdh
          gewicht
          _id
        }
      }
    }
  }
`;

const TableModal = ({
  set,
  exercise,
  index,
}: {
  set: Partial<Set>;
  exercise: Pick<Exercise, "_id" | "category" | "name">;
  index: number;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [setData, setSetData] = useState({
    gewicht: set.gewicht,
    wdh: set.wdh,
  });
  const [closeModal, setCloseModal] = useState(false);
  //destruct mutation
  const [updateSetMutation] = useUpdateSetMutation();
  const [deleteSetMutation] = useDeleteSetMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateSetMutation({
        variables: { id: set._id, gewicht: setData.gewicht, wdh: setData.wdh },
        refetchQueries: [{ query: READ_WORKOUT_QUERY }],
      });
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteSetMutation({
        variables: { id: set._id },
        refetchQueries: [{ query: READ_WORKOUT_QUERY }],
      });
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(index);
  useEffect(() => {
    if (closeModal) {
      onClose();
      setCloseModal(!closeModal);
    }
  }, [closeModal]);
  return (
    <Tr
      onClick={() => {
        onOpen();
        // console.log(index);
      }}
      key={set._id}
      mx={2}
    >
      <Td>{set.gewicht}</Td>
      <Td>{set.wdh}</Td>
      <Td></Td>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="3xl" casing="uppercase">
              {exercise.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="2xl">{index + 1}. Satz</Text>
            <Flex justify="center" direction="column" align="center">
              <HStack>
                <Button
                  onClick={() => {
                    setSetData({ ...setData, gewicht: setData.gewicht - 1.25 });
                    console.log(setData);
                  }}
                  colorScheme="frontend"
                  variant="outline"
                >
                  -
                </Button>
                <Text fontSize="xl" w={20} textAlign="center">
                  {setData.gewicht}
                </Text>
                <Button
                  onClick={() => {
                    setSetData({ ...setData, gewicht: setData.gewicht + 1.25 });
                  }}
                  colorScheme="frontend"
                  variant="outline"
                >
                  +
                </Button>
              </HStack>
              <HStack mt={4}>
                <Button
                  onClick={() => {
                    setSetData({ ...setData, wdh: setData.wdh - 1 });
                  }}
                  colorScheme="frontend"
                  variant="outline"
                >
                  -
                </Button>
                <Text fontSize="xl" w={20} textAlign="center">
                  {setData.wdh}
                </Text>
                <Button
                  onClick={() => {
                    setSetData({ ...setData, wdh: setData.wdh + 1 });
                  }}
                  colorScheme="frontend"
                  variant="outline"
                >
                  +
                </Button>
              </HStack>
            </Flex>
            <Box>NOTIZ FÜR RPE UND TIMER</Box>
          </ModalBody>

          <ModalFooter mt={8}>
            <ButtonGroup>
              <Button
                type="submit"
                colorScheme="red"
                onClick={(e) => {
                  if (confirm("Bist du dir sicher?")) {
                    handleDelete(e);
                  }
                  setCloseModal(true);
                }}
              >
                Satz löschen 🙅‍♂️
              </Button>{" "}
              <Button
                type="submit"
                colorScheme="frontend"
                mr={3}
                onClick={(e) => {
                  handleSubmit(e);
                  setCloseModal(true);
                }}
              >
                Satz ändern ✍️
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Tr>
  );
};

export default TableModal;
