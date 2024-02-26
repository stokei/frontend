import { routes } from "@/routes";
import {
  CustomerCoursePageCourseFragment,
  useGetCustomerCoursePageCourseQuery,
} from "@/views/customers/course/graphql/course.query.graphql.generated";
import { useRouter } from "next/router";
import {
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
  readonly isLoadingCourse?: boolean;
}

export const CustomersCourseContext = createContext(
  {} as CustomersCourseProviderValues
);

export const CustomersCourseProvider = ({
  children,
}: PropsWithChildren<CustomersCourseProviderProps>) => {
  const router = useRouter();
  const courseId = useMemo(() => router?.query?.courseId?.toString(), [router]);

  const [
    { data: dataGetCourse, fetching: isLoadingCourse, error: errorGetCourse },
  ] = useGetCustomerCoursePageCourseQuery({
    pause: !courseId,
    requestPolicy: "network-only",
    variables: {
      courseId: courseId || "",
    },
  });

  useEffect(() => {
    const studentIsUnauthorized = errorGetCourse?.graphQLErrors?.some(
      (e) => (e.extensions?.response as any)?.statusCode === 403
    );
    if (!!studentIsUnauthorized) {
      router.push(routes.notFound);
    }
  }, [errorGetCourse, router]);

  const values: CustomersCourseProviderValues = useMemo(
    () => ({
      course: dataGetCourse?.course,
      isLoadingCourse,
    }),
    [dataGetCourse?.course, isLoadingCourse]
  );

  return (
    <CustomersCourseContext.Provider value={values}>
      {children}
    </CustomersCourseContext.Provider>
  );
};
