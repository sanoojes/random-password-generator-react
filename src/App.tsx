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
import { useEffect, useState } from "react";
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

    const generatePassword = () => {
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
                title: "Uh oh!",
                description:
                    "Please select at least one character type (Lowercase, Uppercase, Digits, Special Characters) to generate a password.",
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
    };
    useEffect(() => {
        setInputValue(password);
    }, [password]);

    return (
        <>
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

