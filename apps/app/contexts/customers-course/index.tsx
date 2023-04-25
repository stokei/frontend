import { routes } from "@/routes";
import {
  CustomerCoursePageCourseFragment,
  useGetCustomerCoursePageCourseQuery,
} from "@/views/customers/course/graphql/course.query.graphql.generated";
import { useRouter } from "next/router";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CustomersCourseProviderProps {
  readonly course?: CustomerCoursePageCourseFragment;
}

export interface CustomersCourseProviderValues {
  readonly course?: CustomerCoursePageCourseFragment;
  readonly isLoading?: boolean;
}

export const CustomersCourseContext = createContext(
  {} as CustomersCourseProviderValues
);

export const CustomersCourseProvider: FC<
  PropsWithChildren<CustomersCourseProviderProps>
> = ({ children }) => {
  const [course, setCourse] = useState<
    CustomerCoursePageCourseFragment | undefined
  >();

  const router = useRouter();
  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const [
    { data: dataGetCourse, fetching: isLoadingCourse, error: errorGetCourse },
  ] = useGetCustomerCoursePageCourseQuery({
    pause: !courseId,
    variables: {
      courseId: courseId || "",
    },
  });

  useEffect(() => {
    const studentisUnauthorized = errorGetCourse?.graphQLErrors?.some(
      (e) => (e.extensions?.response as any)?.statusCode === 403
    );
    if (!!studentisUnauthorized) {
      router.push(routes.notFound);
    }
  }, [errorGetCourse, router]);

  useEffect(() => {
    setCourse(dataGetCourse?.course);
  }, [dataGetCourse]);

  const values: CustomersCourseProviderValues = useMemo(
    () => ({
      course,
      isLoadingCourse,
    }),
    [course, isLoadingCourse]
  );

  return (
    <CustomersCourseContext.Provider value={values}>
      {children}
    </CustomersCourseContext.Provider>
  );
};
