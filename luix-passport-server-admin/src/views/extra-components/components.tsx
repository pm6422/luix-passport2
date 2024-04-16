import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconChevronRight } from '@tabler/icons-react'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Layout, LayoutBody, LayoutHeader } from '@/layouts/layout-definitions'
import { Breadcrumb, BreadcrumbItem } from '@/components/custom/breadcrumb'
import { PinInput, PinInputField } from '@/components/custom/pin-input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { AccountNav } from '@/components/account-nav.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import MultiSelectFormField from '@/components/custom/multi-select'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

export default function ExtraComponents() {
  const items = [
    { title: 'Extra Components', href: '/extra-components' },
    { title: 'Breadcrumb' },
  ].map(({ href, title }) => (
    <BreadcrumbItem key={title}>
      {href ? (
        <Link
          className='text-muted-foreground underline decoration-muted-foreground decoration-dashed underline-offset-4 hover:text-foreground hover:decoration-solid'
          to={href}
        >
          {title}
        </Link>
      ) : (
        <span className='text-muted-foreground'>{title}</span>
      )}
    </BreadcrumbItem>
  ))

  const [pinInput, setPinInput] = useState('')

  const frameworksList = [
    {
      value: "next.js",
      label: "Next.js"
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro"
    },
  ];

  const FormSchema = z.object({
    frameworks: z
      .array(z.string().min(1))
      .min(1)
      .nonempty("Please select at least one framework."),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      frameworks: ["remix"],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(
      `You have selected following frameworks: ${data.frameworks.join(", ")}.`
    );
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <AccountNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Extra Components
          </h1>
        </div>
        <h2 className='text-lg font-bold md:text-xl'>Breadcrumbs</h2>
        <Breadcrumb separator={<IconChevronRight size={18} />}>
          {items}
        </Breadcrumb>
        <Breadcrumb>{items}</Breadcrumb>

        <Separator />

        <h2 className='text-lg font-bold md:text-xl'>Pin Input</h2>
        <div className='flex flex-col gap-12 lg:flex-row'>
          <div className='flex-1'>
            <h3 className='mb-2 font-medium'>Uncontrolled</h3>
            <Tabs defaultValue='preview'>
              <TabsList>
                <TabsTrigger value='preview'>Preview</TabsTrigger>
                <TabsTrigger value='code'>Code</TabsTrigger>
              </TabsList>
              <TabsContent value='preview'>
                <div className='flex min-h-56 items-center justify-center rounded border'>
                  <PinInput
                    className='flex h-10 space-x-4'
                    onComplete={(str) => console.log('completed', str)}
                    autoFocus
                  >
                    <PinInputField component={Input} />
                    <PinInputField component={Input} />
                    <Separator orientation='vertical' />
                    <PinInputField component={Input} />
                    <PinInputField component={Input} />
                  </PinInput>
                </div>
              </TabsContent>
              <TabsContent value='code'>
                <SyntaxHighlighter
                  language='tsx'
                  style={nord}
                  wrapLines
                  wrapLongLines
                >
                  {`<PinInput
                    className='flex h-10 space-x-4'
                    defaultValue=''
                    onComplete={(str) => 
                      console.log('completed', str)
                    }  
                    autoFocus
                  >
                    <PinInputField component={Input} />
                    <PinInputField component={Input} />
                    <Separator orientation='vertical' />
                    <PinInputField component={Input} />
                    <PinInputField component={Input} />
                  </PinInput>
                  `}
                </SyntaxHighlighter>
              </TabsContent>
            </Tabs>
          </div>
          <div className='flex-1'>
            <h3 className='mb-2 font-medium'>Controlled</h3>
            <Tabs defaultValue='preview'>
              <TabsList>
                <TabsTrigger value='preview'>Preview</TabsTrigger>
                <TabsTrigger value='code'>Code</TabsTrigger>
              </TabsList>
              <TabsContent value='preview'>
                <div className='flex min-h-56 items-center justify-center rounded border'>
                  <PinInput
                    className='flex h-10 space-x-4'
                    value={pinInput}
                    onChange={setPinInput}
                    onComplete={(str) => console.log('completed', str)}
                  >
                    {Array.from({ length: 4 }, (_, i) => (
                      <PinInputField key={i} component={Input} />
                    ))}
                  </PinInput>
                </div>
              </TabsContent>
              <TabsContent value='code'>
                <SyntaxHighlighter
                  language='tsx'
                  style={nord}
                  wrapLines
                  wrapLongLines
                >
                  {`function ControlledPinInput() {
                    const [pinInput, setPinInput] = useState('');
                  
                    return (
                      <PinInput
                        className='flex h-10 space-x-4'
                        value={pinInput}
                        onChange={setPinInput}
                        onComplete={(str) => 
                          console.log('completed', str)
                        }
                      >
                        {Array.from({ length: 4 }, (_, i) => (
                          <PinInputField key={i} component={Input} />
                        ))}
                      </PinInput>
                    )
                  }`}
                </SyntaxHighlighter>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="frameworks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Code</FormLabel>
                  <FormControl>
                    <MultiSelectFormField
                      options={frameworksList}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select a category code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </form>
      </Form>
        

      </LayoutBody>
    </Layout>
  )
}
