/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import {
  mediaBulkUploadService,
  mediaDeleteService,
  mediaUploadService,
} from "@/servises";
import { useContext, useRef } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import VideoPlayer from "@/components/video-player";
import { Upload } from "lucide-react";

const CourseCurriculum = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
  } = useContext(InstructorContext);

  const bulkUploadInputRef = useRef(null);

  const handleAddNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  };

  const handleCourseTitleChange = (event, currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  const handleFreePreviewChange = (currentValue, currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  const handleSingleLectureUpload = async (event, currentIndex) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(videoFormData);
        if (response.success) {
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isCourseCurriculumFormDataValid = () => {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  };

  const handleReplaceVideo = async (currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      copyCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPublicId
    );

    if (deleteCurrentMediaResponse?.success) {
      copyCourseCurriculumFormData[currentIndex] = {
        ...copyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };
    }
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  const handleOpenBulkUpload = () => {
    bulkUploadInputRef.current?.click();
  };

  const areAllCourseCurriculumFormDataObjectsEmpty = (arr) => {
    return arr.every((obj) => {
      return Object.entries(obj).every(([key, value]) => {
        if (typeof value === "boolean") {
          return true;
        }
        return value === "";
      });
    });
  };

  const handleMediaBulkUpload = async (event) => {
    const selectedFile = Array.from(event.target.files);

    // console.log(selectedFile);

    const bulkFormData = new FormData();
    selectedFile.forEach((fileItem) => {
      bulkFormData.append("files", fileItem);
    });

    try {
      setMediaUploadProgress(true);
      const response = await mediaBulkUploadService(bulkFormData);

      console.log(response, "bulk");
      if (response?.success) {
        let cpyCourseCurriculumFormdata =
          areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
            ? []
            : [...courseCurriculumFormData];

        cpyCourseCurriculumFormdata = [
          ...cpyCourseCurriculumFormdata,
          // eslint-disable-next-line no-unsafe-optional-chaining
          ...response?.data.map((item, index) => ({
            videoUrl: item?.url,
            public_id: item?.public_id,
            title: `Lecture ${
              cpyCourseCurriculumFormdata.length + (index + 1)
            }`,
            freePreview: false,
          })),
        ];
        setCourseCurriculumFormData(cpyCourseCurriculumFormdata);
        setMediaUploadProgress(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteVideo = async (currentIndex) => {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentSelectedVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const response = await mediaDeleteService(getCurrentSelectedVideoPublicId);

    if (response?.success) {
      cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter(
        (_, index) => index !== currentIndex
      );

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
        <div className="">
          <Input
            type="file"
            accept="video/*"
            multiple
            ref={bulkUploadInputRef}
            className="hidden"
            id="bulk-media-upload"
            onChange={handleMediaBulkUpload}
          />
          <Button
            as="label"
            htmlFor="bulk-media-upload"
            variant="outline"
            className="cursor-pointer "
            onClick={handleOpenBulkUpload}
          >
            <Upload className="w-4 h-5 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleAddNewLecture}
        >
          Add Lecture
        </Button>
        <div className="mt-4 mb-4">
          {mediaUploadProgress && (
            <div className="mb-4">
              {/* this is done using material ui */}
              <LinearProgress sx={{ height: 8, borderRadius: 4 }} />
            </div>
          )}
        </div>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div className="border p-4 rounded-md" key={index}>
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-4">
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className="flex gap-3">
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                      width={"500px"}
                      height={"300px"}
                    />
                    <Button onClick={() => handleReplaceVideo(index)}>
                      Replace Video
                    </Button>
                    <Button
                      onClick={() => handleDeleteVideo(index)}
                      className="bg-red-800"
                    >
                      Delete Lecture
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(event) =>
                      handleSingleLectureUpload(event, index)
                    }
                    className="mb-4"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
