import React from "react";
import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from "@chakra-ui/react";
import * as IconComponent from "./components";

export const icons = {
  passwordShow: IconComponent.PasswordShowIcon,
  passwordHide: IconComponent.PasswordHideIcon,
  info: IconComponent.InfoIcon,
  contact: IconComponent.ContactIcon,
  bankAccount: IconComponent.BankAccountIcon,
  email: IconComponent.EmailIcon,
  smile: IconComponent.SmileIcon,
  check: IconComponent.CheckIcon,
  user: IconComponent.UserIcon,
  back: IconComponent.BackIcon,
  menu: IconComponent.MenuIcon,
  address: IconComponent.AddressIcon,
  menuEllipsis: IconComponent.MenuEllipsisIcon,
  logout: IconComponent.LogoutIcon,
  arrowDown: IconComponent.ArrowDownIcon,
  arrowUp: IconComponent.ArrowUpIcon,
  arrowLeft: IconComponent.ArrowLeftIcon,
  arrowRight: IconComponent.ArrowRightIcon,
  caretDown: IconComponent.CaretDownIcon,
  caretUp: IconComponent.CaretUpIcon,
  caretLeft: IconComponent.CaretLeftIcon,
  caretRight: IconComponent.CaretRightIcon,
  search: IconComponent.SearchIcon,
  about: IconComponent.AboutIcon,
  video: IconComponent.VideoIcon,
  home: IconComponent.HomeIcon,
  plus: IconComponent.PlusIcon,
  setting: IconComponent.SettingIcon,
  plan: IconComponent.PlanIcon,
  dashboard: IconComponent.DashboardIcon,
  order: IconComponent.OrderIcon,
  cart: IconComponent.CartIcon,
  store: IconComponent.StoreIcon,
  subscription: IconComponent.SubscriptionIcon,
  star: IconComponent.StarIcon,
  starFilled: IconComponent.StarFillIcon,
  starHalf: IconComponent.StarHalfIcon,
  app: IconComponent.AppIcon,
  course: IconComponent.CourseIcon,
  notification: IconComponent.NotificationIcon,
  loading: IconComponent.LoadingIcon,
  wallet: IconComponent.WalletIcon,
  lightMode: IconComponent.LightModeIcon,
  darkMode: IconComponent.DarkModeIcon,
  play: IconComponent.PlayIcon,
  pause: IconComponent.PauseIcon,
  stop: IconComponent.StopIcon,
  muted: IconComponent.VolumeMutedIcon,
  unmuted: IconComponent.VolumeUnmutedIcon,
  fullscreen: IconComponent.FullScreenIcon,
  exitFullscreen: IconComponent.ExitFullScreenIcon,
  pictureInPicture: IconComponent.PictureInPictureIcon,
  exitPictureInPicture: IconComponent.ExitPictureInPictureIcon,
  reload: IconComponent.ReloadIcon,
  error: IconComponent.ErrorIcon,
  ok: IconComponent.OkIcon,
  trash: IconComponent.TrashIcon,
};

export type IconName = keyof typeof icons;

export interface IconProps extends ChakraIconProps {
  readonly name: IconName;
}

export const Icon: React.FC<IconProps> = ({ children, ...props }) => (
  <ChakraIcon {...props} as={icons[props.name] as any} />
);
