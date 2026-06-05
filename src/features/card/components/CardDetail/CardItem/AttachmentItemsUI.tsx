import { AttachmentResponse } from "@/src/types/attachment";
import styles from "../CardDetail.module.css";

interface AttachmentItemProps {
  attachments: AttachmentResponse[];
  handleCreateAttachment: (file: File) => void;
  handleDeleteAttachment: (attachmentId: number) => void;
}

export const AttachmentItemsUI = ({
  attachments,
  handleCreateAttachment,
  handleDeleteAttachment,
}: AttachmentItemProps) => {
  return (
    <>
      <div className={`${styles.contentSection} mt-4`}>
        <h3 className={styles.sectionTitle}>
          <span className="me-2">📎</span> Attachments
        </h3>
        {attachments?.map((file, index) => {
          const isImage = file.fileType?.includes("image");
          const fileExtension = file.fileName?.split(".").pop()?.toUpperCase() || "FILE";
          return (
            <div key={index} className={styles.attachmentItem}>
              <div className={styles.filePreview}>
                {isImage ? (
                  <img src={file.fileUrl} alt="preview" />
                ) : (
                  <span className={styles.fileExtensionText}>{fileExtension}</span>
                )}
              </div>
              <div className={styles.attachmentContent}>
                <span className={styles.fileName}>{file.fileName}</span>
                <div className={styles.fileMeta}>
                  <span>Added {new Date(file.createAt).toLocaleDateString("vi-VN")}</span>
                  <span>•</span>
                  <span>{file.fileSize / 1024}KB</span>
                </div>
                <div className={styles.fileActions}>
                  <span onClick={() => handleDeleteAttachment(file.attachmentId)}>Delete</span>
                  <span>
                    <a href={file.fileUrl} download={file.fileUrl} target="_blank" rel="noreferrer">
                      Download
                    </a>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-3">
          <input
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleCreateAttachment(e.target.files[0]);
                e.target.value = "";
              }
            }}
            type="file"
            id="file-upload"
            className="d-none"
          />
          <label
            htmlFor="file-upload"
            className={`${styles.btnTrello} d-flex align-items-center`}
            style={{ cursor: "pointer", width: "fit-content" }}
          >
            <span className="me-2">➕</span>
            <span>Add an attachment</span>
          </label>
        </div>
      </div>
    </>
  );
};
