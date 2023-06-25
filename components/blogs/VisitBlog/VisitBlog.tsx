import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { CgFacebook } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import BlogPartition from "./BlogPartition/BlogPartition";
import HeadTitle from "./HeadTitle/HeadTitle";
import HeroImage from "./HeroImage/HeroImage";
import visblog from "./VisitBlog.module.css";
import { Blog } from "types/blogs"

export default function VisitBlog({ data }: { data: Blog }) {
  return (
    <>
      <HeadTitle
        headTitle={data.headTitle}
        displayName={data.displayName}
        date={data.date}
      />

      <HeroImage heroImageSrc={data.heroImageSrc} />

      <div className={visblog.container}>
        <ul className={visblog.anchors}>
          {data.blogData.map((content, index) => {
            if (content.title === "Image") return;
            return (
              <li key={`anchor${index}`}>
                <a href={`#anchor${index}`}>----{content.title}</a>
              </li>
            );
          })}
        </ul>

        <ul className={visblog.contact}>
          <li className={visblog.fb}>
            <CgFacebook className={visblog.icn} color="white" />
          </li>
          <li className={visblog.fb}>
            <AiOutlineTwitter className={visblog.icn} color="white" />
          </li>
          <li className={visblog.fb}>
            <AiOutlineInstagram className={visblog.icn} color="white" />
          </li>
          <li className={visblog.fb}>
            <MdOutlineEmail className={visblog.icn} color="white" />
          </li>
        </ul>

        <div className={visblog.content}>
          {data.blogData.map((content, index) => {
            return (
              <BlogPartition
                key={`title${index}`}
                index={index}
                title={content.title}
                text={content.content}
                imageUrl={content.src}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}