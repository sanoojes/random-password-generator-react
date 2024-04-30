import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./components/ui/toast";

export default function App() {
    const { toast } = useToast();

    const defaultSliderValue = 20;
    const [sliderValue, setSliderValue] = useState<number>(defaultSliderValue);
    const [inputValue, setInputValue] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [useLowercase, setUseLowercase] = useState<boolean>(true);
    const [useUppercase, setUseUppercase] = useState<boolean>(true);
    const [useDigits, setUseDigits] = useState<boolean>(true);
    const [useSpecialChars, setUseSpecialChars] = useState<boolean>(true);

    const handleCopy = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            toast({ title: "Copied.." });
        } else {
            toast({
                title: "There is nothing to copy",
                description: "Please generate the password first",
                variant: "destructive",
                action: (
                    <ToastAction
                        onClick={() => {
                            generatePassword();
                        }}
                        altText="Generate Password"
                    >
                        Generate Password
                    </ToastAction>
                ),
            });
        }
    };

    const selectAllTypes = () => {
        setUseLowercase(true);
        setUseUppercase(true);
        setUseDigits(true);
        setUseSpecialChars(true);
    };

    const generatePassword = useCallback(() => {
        if (useLowercase || useDigits || useSpecialChars || useUppercase) {
            let characters = "";
            if (useLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
            if (useUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if (useDigits) characters += "0123456789";
            if (useSpecialChars) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";
            let passwordd = "";
            for (let i = 0; i < sliderValue; i++) {
                passwordd += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            return setPassword(passwordd);
        } else {
            toast({
                title: "Oops! No Character Types Selected.",
                description:
                    "To create a strong and secure password, please select at least one character type: Lowercase Letters, Uppercase Letters, Digits (Numbers), or Special Characters.",
                variant: "destructive",
                action: (
                    <ToastAction
                        onClick={() => {
                            selectAllTypes();
                        }}
                        altText="Check All Types"
                    >
                        Check All Types
                    </ToastAction>
                ),
            });
        }
    }, [
        useLowercase,
        useUppercase,
        useDigits,
        useSpecialChars,
        sliderValue,
        toast,
    ]);
    useEffect(() => {
        setInputValue(password);
    }, [password]);

    useEffect(() => {
        generatePassword();
    }, [sliderValue, useDigits, useLowercase, useUppercase, useSpecialChars]);

    return (
        <>
            <button
                type="button"
                className="absolute top-4 right-2 bg-slate-800 hover:bg-slate-700 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 transition-colors"
                onClick={() => {
                    open(
                        `https://github.com/sanoojes` +
                            import.meta.env.BASE_URL,
                        "SingleSecondaryWindowName"
                    );
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="2rem"
                    height="2rem"
                    fill="#fff"
                >
                    <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z" />
                </svg>
            </button>
            <main className="flex text-neutral-50 bg-neutral-950 h-screen w-screen justify-center items-center">
                <Card className="w-8/12 max-w-screen-md">
                    <CardHeader>
                        <CardTitle>Random Password Generator</CardTitle>
                        <CardDescription>
                            Get your Random Password
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                        <Card className="flex gap-2">
                            <Input
                                placeholder="Your Password Goes Here"
                                value={inputValue}
                            />
                            <Button type="button" onClick={handleCopy}>
                                <svg
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.503 4.627 5.5 6.75v10.504a3.25 3.25 0 0 0 3.25 3.25h8.616a2.251 2.251 0 0 1-2.122 1.5H8.75A4.75 4.75 0 0 1 4 17.254V6.75c0-.98.627-1.815 1.503-2.123ZM17.75 2A2.25 2.25 0 0 1 20 4.25v13a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-13A2.25 2.25 0 0 1 8.75 2h9Z"
                                        fill="#ffffff"
                                    />
                                </svg>
                            </Button>
                        </Card>
                        <Card className="justify-between px-6 py-4 space-y-4 items-center">
                            <CardTitle className="flex justify-between text-base">
                                Length
                                <span>{sliderValue}</span>
                            </CardTitle>
                            <Slider
                                onValueChange={(value: Array<number>) =>
                                    setSliderValue(value[0])
                                }
                                defaultValue={[defaultSliderValue]}
                                max={100}
                                min={8}
                                step={1}
                            />
                        </Card>
                        <Card className="flex justify-between px-6 py-4 items-center">
                            <p>Lowercase Letters</p>
                            <Switch
                                checked={useLowercase}
                                onCheckedChange={(e) => {
                                    setUseLowercase(e);
                                }}
                            />
                        </Card>
                        <Card className="flex justify-between px-6 py-4 items-center">
                            <p>Uppercase Letters</p>
                            <Switch
                                checked={useUppercase}
                                onCheckedChange={(e) => {
                                    setUseUppercase(e);
                                }}
                            />
                        </Card>
                        <Card className="flex justify-between px-6 py-4 items-center">
                            <p>Digits (Numbers)</p>
                            <Switch
                                checked={useDigits}
                                onCheckedChange={(e) => {
                                    setUseDigits(e);
                                }}
                            />
                        </Card>
                        <Card className="flex justify-between px-6 py-4 items-center">
                            <p>Special Charecters</p>
                            <Switch
                                checked={useSpecialChars}
                                onCheckedChange={(e) => {
                                    setUseSpecialChars(e);
                                }}
                            />
                        </Card>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button onClick={generatePassword} className="w-full">
                            Generate Random Password
                        </Button>
                    </CardFooter>
                </Card>
            </main>
            <Toaster />
        </>
    );
}

