"use client"
import { useEffect } from "react";
import { AddResourceForm, ChallengeForm, TasksForm } from "@/components/forms";
import { LoadingLayout, ModalLayout } from "@/components/shared";
import { IChallenge, IResource, IResourceDetail, IResourceNew, ITask } from "@/helper/model/challenge";
import useChallenge from "@/hook/useChallenge";
import { useFetchData } from "@/hook/useFetchData";
import useOverview from "@/hook/useOverview";

interface EditModalProps {
  isOpen: boolean;
  onClose: (by: boolean) => void;
  type: "task" | "challenge" | "resource";
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
    image: imageFile,
    setImage: setImageFile,
    isOpen,
    setIsOpen,
  } = useChallenge(type === "task" ? taskID : id, true);

  const { formikResource, addResourceMutate, isOpen: openResources, setIsOpen: setOpenResources, image, setImage } = useOverview()

  // Fetch challenge or task data depending on type
  const { data, isLoading } = useFetchData<IChallenge>({
    endpoint: `/challenge/single/${id}`,
    name: "challengedetails",
    enable: type === "challenge",
  });

  const { data: taskData, isLoading: loadingTask } = useFetchData<ITask>({
    endpoint: `/task/${taskID}`,
    enable: type === "task",
  });


  const { data: resourceData, isLoading: loadingResource } = useFetchData<IResourceNew>({
    endpoint: `/resource/${taskID}`,
    enable: type === "resource",
  }); 

  // Sync modal state with parent open prop
  useEffect(() => {
    setIsOpen(open);
    setOpenResources(openResources)
  }, [open, setIsOpen, setOpenResources]);

  // Notify parent when modal closes
  useEffect(() => {
    if (!isOpen) {
      onClose(false)
    };
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
        tags: data.tags,
        level: data.level?._id,
        category: data.category,
        startDate: data.startDate,
        endDate: data.endDate,
        industry: data.industry?._id,
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

    if (type === "resource" && resourceData && !formikResource.values.description) {
      formikResource.setValues({
        ...formikResource.values,
        description: resourceData?._doc?.description,
      });
    }
  }, [data, taskData, type, id, resourceData]);
 
  return (
    <>
      <ModalLayout
        size={type === "task" ? "md" :type === "resource" ? "md" : "2xl"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <LoadingLayout loading={isLoading || loadingTask || loadingResource}>
          {type === "challenge" && (
            <ChallengeForm
              image={imageFile}
              setImage={setImageFile}
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

          {type === "resource" && (
            <AddResourceForm image={image} setImage={setImage} preview={resourceData?.url} isLoading={addResourceMutate.isPending} formik={formikResource} />
          )}

        </LoadingLayout>
      </ModalLayout>
    </>
  );
}
