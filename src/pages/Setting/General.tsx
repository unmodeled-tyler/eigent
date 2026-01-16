import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import light from "@/assets/light.png";
import dark from "@/assets/dark.png";
import transparent from "@/assets/transparent.png";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { LocaleEnum, switchLanguage } from "@/i18n";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
Select,
SelectContent,
SelectGroup,
SelectItem,
SelectLabel,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";

export default function SettingGeneral() {
const { t } = useTranslation();
const authStore = useAuthStore();

const setAppearance = authStore.setAppearance;
const language = authStore.language;
const setLanguage = authStore.setLanguage;
const appearance = authStore.appearance;
	

const [themeList, setThemeList] = useState<any>([
{
img: dark,
label: "setting.dark",
value: "dark",
},
{
img: light,
label: "setting.light",
value: "light",
},
{
img: transparent,
label: "setting.transparent",
value: "transparent",
},
]);

	const languageList = [
		{
			key: LocaleEnum.English,
			label: "English",
		},
		{
			key: LocaleEnum.SimplifiedChinese,
			label: "简体中文",
		},
		{
			key: LocaleEnum.TraditionalChinese,
			label: "繁體中文",
		},
		{
			key: LocaleEnum.Japanese,
			label: "日本語",
		},
		{
			key: LocaleEnum.Arabic,
			label: "العربية",
		},
		{
			key: LocaleEnum.French,
			label: "Français",
		},
		{
			key: LocaleEnum.German,
			label: "Deutsch",
		},
		{
			key: LocaleEnum.Russian,
			label: "Русский",
		},
		{
			key: LocaleEnum.Spanish,
			label: "Español",
		},
		{
			key: LocaleEnum.Korean,
			label: "한국어",
		},
		{
			key: LocaleEnum.Italian,
			label: "Italiano",
		},
	];

useEffect(() => {
const platform = window.electronAPI.getPlatform();
console.log(platform);
if (platform === "darwin") {
setThemeList([
{
img: dark,
label: "setting.dark",
value: "dark",
},
{
img: light,
label: "setting.light",
value: "light",
},
{
img: transparent,
label: "setting.transparent",
value: "transparent",
},
]);
} else {
setThemeList([
{
img: dark,
label: "setting.dark",
value: "dark",
},
{
img: light,
label: "setting.light",
value: "light",
},
]);
}
}, []);

  return (
<div className="space-y-8">
<div className="px-6 py-4 bg-surface-secondary rounded-2xl">
<div className="text-body-lg font-bold text-text-heading">
{t("setting.language")}
</div>
				<div className="mt-md">
					<Select value={language} onValueChange={switchLanguage}>
						<SelectTrigger>
							<SelectValue placeholder={t("setting.select-language")} />
						</SelectTrigger>
						<SelectContent className="bg-input-bg-default border">
							<SelectGroup>
								<SelectItem value="system">
									{t("setting.system-default")}
								</SelectItem>
								{languageList.map((item) => (
									<SelectItem key={item.key} value={item.key}>
										{item.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="px-6 py-4 bg-surface-secondary rounded-2xl">
<div className="text-body-lg font-bold text-text-heading">
{t("setting.appearance")}
</div>
				<div className="flex items-center gap-md mt-md">
					{themeList.map((item: any) => (
						<div
							key={item.label}
							className="hover:cursor-pointer group flex flex-col items-center gap-sm "
							onClick={() => setAppearance(item.value)}
						>
							<img
								src={item.img}
								className={`rounded-lg transition-all h-[91.67px] aspect-[183/91.67] border border-solid border-transparent group-hover:border-bg-fill-info-primary ${
									item.value == appearance ? "border-bg-fill-info-primary" : ""
								}`}
								alt=""
							/>
<div
className={`text-sm leading-13 text-text-heading group-hover:underline ${
item.value == appearance ? "underline" : ""
}`}
>
								{t(item.label)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}