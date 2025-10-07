import { useEffect } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { DropdownItem } from "@heroui/react";
import { ChallengeForm, TasksForm } from "@/components/forms";
import { LoadingLayout, ModalLayout } from "@/components/shared";
import { IChallenge, ITask } from "@/helper/model/challenge";
import useChallenge from "@/hook/useChallenge";
import { useFetchData } from "@/hook/useFetchData";

interface EditModalProps {
  isOpen: boolean;
  onClose: (by: boolean) => void;
  type: "task" | "challenge";
  id: string;
  taskID?: string;
}

export default function EditModal({
  isOpen: open,
  onClose,
  type,
  id,
  taskID,
}: EditModalProps) {
  const {
    formikChallenge,
    editChallenge,
    uploadImage,
    formikTask,
    editTask,
    isOpen,
    setIsOpen,
  } = useChallenge(type === "task" ? taskID : id, true);

  // Fetch challenge or task data depending on type
  const { data, isLoading } = useFetchData<IChallenge>({
    endpoint: `/challenge/${id}`,
    name: "challengedetails",
    enable: type === "challenge",
  });

  const { data: taskData, isLoading: loadingTask } = useFetchData<ITask>({
    endpoint: `/task/${taskID}`,
    enable: type === "task",
  });

  // Sync modal state with parent open prop
  useEffect(() => {
    setIsOpen(open);
  }, [open, setIsOpen]);

  // Notify parent when modal closes
  useEffect(() => {
    if (!isOpen) onClose(false);
  }, [isOpen, onClose]);

  // Populate form data when API response arrives
  useEffect(() => {
    if (type === "challenge" && data && !formikChallenge.values.title) {
      const tracks = data.tracks?.map((t) => t._id) || [];

      formikChallenge.setValues({
        ...formikChallenge.values,
        isPublic: data.isPublic,
        title: data.title,
        description: data.description,
        winnerPrice: data.winnerPrice,
        participationFee: data.participationFee,
        category: data.category,
        tags: data.tags,
        level: data.level,
        startDate: data.startDate,
        endDate: data.endDate,
        industry: data.industry,
        tracks,
      });
    }

    if (type === "task" && taskData && !formikTask.values.title) {
      formikTask.setValues({
        ...formikTask.values,
        title: taskData.title,
        description: taskData.description,
        startDate: taskData.startDate,
        endDate: taskData.endDate,
        challengeID: id,
      });
    }
  }, [data, taskData, type, id]);

  return (
    <>
      <ModalLayout
        size={type === "task" ? "md" : "2xl"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <LoadingLayout loading={isLoading || loadingTask}>
          {type === "challenge" && (
            <ChallengeForm
              formik={formikChallenge}
              isLoading={editChallenge.isPending || uploadImage.isPending}
              preview={data?.url}
            />
          )}

          {type === "task" && (
            <TasksForm
              formik={formikTask}
              isLoading={editTask.isPending}
              edit
            />
          )}
        </LoadingLayout>
      </ModalLayout>
    </>
  );
}
