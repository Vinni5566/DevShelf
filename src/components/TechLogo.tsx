import {
  siAframe,
  siAngular,
  siApple,
  siBabylondotjs,
  siCplusplus,
  siCss,
  siDjango,
  siDocker,
  siExpo,
  siExpress,
  siFastapi,
  siFigma,
  siFirebase,
  siFlutter,
  siFramer,
  siGit,
  siGithub,
  siGo,
  siHtml5,
  siHuggingface,
  siJavascript,
  siJetpackcompose,
  siKotlin,
  siKubernetes,
  siLucide,
  siMaterialdesign,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNotion,
  siPostgresql,
  siPostman,
  siPython,
  siPytorch,
  siRadixui,
  siReact,
  siRedis,
  siRust,
  siScikitlearn,
  siSpringboot,
  siStorybook,
  siSwift,
  siTailwindcss,
  siTensorflow,
  siThreedotjs,
  siTypescript,
  siUnity,
  siUnrealengine,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";
import { Accessibility, Code2, Coffee, Compass, Cpu, Glasses, Wand2 } from "lucide-react";

const simpleIconMap: Record<string, SimpleIcon> = {
  python: siPython,
  javascript: siJavascript,
  typescript: siTypescript,
  cpp: siCplusplus,
  go: siGo,
  rust: siRust,
  react: siReact,
  nextjs: siNextdotjs,
  vue: siVuedotjs,
  angular: siAngular,
  html: siHtml5,
  css: siCss,
  tailwind: siTailwindcss,
  nodejs: siNodedotjs,
  express: siExpress,
  django: siDjango,
  fastapi: siFastapi,
  spring: siSpringboot,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  redis: siRedis,
  mysql: siMysql,
  firebase: siFirebase,
  pytorch: siPytorch,
  tensorflow: siTensorflow,
  "scikit-learn": siScikitlearn,
  huggingface: siHuggingface,
  git: siGit,
  github: siGithub,
  docker: siDocker,
  kubernetes: siKubernetes,
  postman: siPostman,
  figma: siFigma,
  framer: siFramer,
  storybook: siStorybook,
  notion: siNotion,
  threejs: siThreedotjs,
  unity: siUnity,
  unreal: siUnrealengine,
  babylonjs: siBabylondotjs,
  aframe: siAframe,
  "material-design": siMaterialdesign,
  "apple-hig": siApple,
  "radix-ui": siRadixui,
  lucide: siLucide,
  "react-native": siReact,
  flutter: siFlutter,
  swiftui: siSwift,
  "jetpack-compose": siJetpackcompose,
  expo: siExpo,
  kotlin: siKotlin,
};

type TechLogoProps = {
  techId: string;
  size?: number;
  className?: string;
};

export function TechLogo({ techId, size = 20, className = "" }: TechLogoProps) {
  const icon = simpleIconMap[techId];

  if (icon) {
    return (
      <svg
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        className={className}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  if (techId === "java") {
    return <Coffee size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
  }

  if (techId === "openai") {
    return <Cpu size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
  }

  if (techId === "webxr") {
    return <Glasses size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
  }

  if (techId === "wai-aria") {
    return (
      <Accessibility size={size} strokeWidth={1.75} className={className} aria-hidden="true" />
    );
  }

  if (techId === "laws-of-ux") {
    return <Compass size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
  }

  if (techId === "book-of-shaders") {
    return <Wand2 size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
  }

  return <Code2 size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}
